package com.ATME.College.Alumni.Placement.Management.System.Service;

import com.ATME.College.Alumni.Placement.Management.System.Model.Alumni;
import com.ATME.College.Alumni.Placement.Management.System.Model.AlumniMeet;
import com.ATME.College.Alumni.Placement.Management.System.Repository.AlumniMeetRepository;
import com.ATME.College.Alumni.Placement.Management.System.Repository.AlumniRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // ✅ FIX: Import Transactional

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlumniMeetService {

    private final AlumniMeetRepository alumniMeetRepo;
    private final AlumniRepository alumniRepo;

    @Transactional // ✅ FIX: Add Transactional
    public AlumniMeet createAlumniMeet(AlumniMeet alumniMeet) {
        return alumniMeetRepo.save(alumniMeet);
    }

    @Transactional(readOnly = true) // FIX: Add Transactional (readOnly)
    public List<AlumniMeet> getAllAlumniMeets() {
        return alumniMeetRepo.findAll();
    }

    @Transactional(readOnly = true) // ✅ FIX: Add Transactional (readOnly)
    public Optional<AlumniMeet> getAlumniMeetById(Long id) {
        return alumniMeetRepo.findById(id);
    }

    @Transactional // FIX: Add Transactional
    public Optional<AlumniMeet> updateAlumniMeet(Long id, AlumniMeet updatedMeet) {
        return alumniMeetRepo.findById(id).map(m -> {
            m.setTitle(updatedMeet.getTitle());
            m.setDescription(updatedMeet.getDescription());
            m.setDate(updatedMeet.getDate());
            m.setImageBase64(updatedMeet.getImageBase64());
            return alumniMeetRepo.save(m);
        });
    }

    @Transactional // ✅ FIX: Add Transactional
    public boolean deleteAlumniMeet(Long id) {
        if (alumniMeetRepo.existsById(id)) {
            alumniMeetRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // Register alumni for a meet
    @Transactional // FIX: Add Transactional
    public String registerAlumniForMeet(Long alumniId, Long meetId) {
        Optional<Alumni> alumniOpt = alumniRepo.findById(alumniId);
        Optional<AlumniMeet> meetOpt = alumniMeetRepo.findById(meetId);

        if (alumniOpt.isEmpty() || meetOpt.isEmpty()) {
            return "Invalid Alumni ID or Meet ID";
        }

        Alumni alumni = alumniOpt.get();
        AlumniMeet meet = meetOpt.get();

        if (alumni.getRegisteredMeets().contains(meet)) {
            return "Alumni already registered for this event.";
        }

        // FIX: Sync both sides of the relationship
        alumni.getRegisteredMeets().add(meet); // Owning side
        meet.getRegisteredAlumni().add(alumni); // Inverse side (for in-memory consistency)

        alumniRepo.save(alumni); // Save the owning side

        return "Alumni registered successfully for: " + meet.getTitle();
    }

    // Get all alumni registered for a meet
    @Transactional(readOnly = true) // FIX: Add Transactional (readOnly)
    public List<Alumni> getRegisteredAlumni(Long meetId) {
        Optional<AlumniMeet> meetOpt = alumniMeetRepo.findById(meetId);

        if (meetOpt.isEmpty()) {
            System.out.println("Meet not found with ID: " + meetId);
            return new ArrayList<>(); // avoid exception
        }

        AlumniMeet meet = meetOpt.get();
        System.out.println("Found meet: " + meet.getTitle());

        // This will now work because @Transactional allows LAZY loading
        return new ArrayList<>(meet.getRegisteredAlumni());
    }
}