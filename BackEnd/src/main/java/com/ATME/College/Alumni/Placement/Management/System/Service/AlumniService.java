package com.ATME.College.Alumni.Placement.Management.System.Service;

import com.ATME.College.Alumni.Placement.Management.System.Model.Alumni;
import com.ATME.College.Alumni.Placement.Management.System.Model.AlumniMeet;
import com.ATME.College.Alumni.Placement.Management.System.Repository.AlumniMeetRepository;
import com.ATME.College.Alumni.Placement.Management.System.Repository.AlumniRepository;
import com.ATME.College.Alumni.Placement.Management.System.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AlumniService {

    private final AlumniRepository alumniRepo;
    private final AlumniMeetRepository alumniMeetRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ✅ Register new alumni
    @Transactional
    public Alumni register(Alumni alumni) {
        alumni.setPassword(passwordEncoder.encode(alumni.getPassword()));
        return alumniRepo.save(alumni);
    }

    // ✅ Login and return JWT + alumni details
    @Transactional(readOnly = true)
    public Optional<Map<String, Object>> login(String email, String password) {
        Optional<Alumni> alumniOpt = alumniRepo.findByEmail(email);
        if (alumniOpt.isPresent()) {
            Alumni alumni = alumniOpt.get();
            if (passwordEncoder.matches(password, alumni.getPassword())) {
                String token = jwtUtil.generateToken(alumni.getEmail());
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("alumni", alumni);
                return Optional.of(response);
            }
        }
        return Optional.empty();
    }

    // ✅ Search by name or USN
    @Transactional(readOnly = true)
    public List<Alumni> search(String keyword) {
        List<Alumni> byName = alumniRepo.findByNameContainingIgnoreCase(keyword);
        List<Alumni> byUsn = alumniRepo.findByUsnContainingIgnoreCase(keyword);

        Set<Alumni> resultSet = new LinkedHashSet<>();
        resultSet.addAll(byName);
        resultSet.addAll(byUsn);

        return new ArrayList<>(resultSet);
    }

    // ✅ Filter by batch (year of graduation)
    @Transactional(readOnly = true)
    public List<Alumni> getByBatch(String yearOfGraduation) {
        return alumniRepo.findByYearOfGraduation(yearOfGraduation);
    }

    // ✅ Get all alumni
    @Transactional(readOnly = true)
    public List<Alumni> getAllAlumni() {
        return alumniRepo.findAll();
    }

    // ✅ Delete alumni by ID
    @Transactional
    public boolean deleteAlumni(Long id) {
        if (alumniRepo.existsById(id)) {
            alumniRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ Register alumni for a meet
    @Transactional
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

        alumni.getRegisteredMeets().add(meet);
        meet.getRegisteredAlumni().add(alumni);

        alumniRepo.save(alumni);

        return "Alumni registered successfully for: " + meet.getTitle();
    }
}
