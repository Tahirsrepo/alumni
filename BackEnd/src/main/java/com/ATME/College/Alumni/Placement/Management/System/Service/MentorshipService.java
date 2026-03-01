package com.ATME.College.Alumni.Placement.Management.System.Service;

import com.ATME.College.Alumni.Placement.Management.System.Model.Alumni;
import com.ATME.College.Alumni.Placement.Management.System.Model.Mentorship;
import com.ATME.College.Alumni.Placement.Management.System.Model.User;
import com.ATME.College.Alumni.Placement.Management.System.Repository.AlumniRepository;
import com.ATME.College.Alumni.Placement.Management.System.Repository.MentorshipRepository;
import com.ATME.College.Alumni.Placement.Management.System.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set; // ✅ FIX: Added import for Set

@Service
@RequiredArgsConstructor
public class MentorshipService {

    private final MentorshipRepository mentorshipRepository;
    private final AlumniRepository alumniRepository; // Assumed
    private final UserRepository userRepository;

    @Transactional
    public Mentorship createMentorship(Mentorship mentorship, Long alumniId) {
        Alumni alumni = alumniRepository.findById(alumniId)
                .orElseThrow(() -> new RuntimeException("Alumni not found"));
        
        mentorship.setPostedByAlumni(alumni);
        mentorship.setPostedDate(LocalDate.now());
        
        return mentorshipRepository.save(mentorship);
    }

    @Transactional(readOnly = true)
    public List<Mentorship> getAllMentorships() {
        return mentorshipRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Mentorship> getMentorshipById(Long id) {
        return mentorshipRepository.findById(id);
    }

    @Transactional
    public String registerForMentorship(Long userId, Long mentorshipId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Mentorship mentorship = mentorshipRepository.findById(mentorshipId)
                .orElseThrow(() -> new RuntimeException("Mentorship not found"));

        if (user.getRegisteredMentorships().contains(mentorship)) {
            return "Already registered for this mentorship";
        }

        user.getRegisteredMentorships().add(mentorship);
        mentorship.getRegisteredUsers().add(user);
        
        userRepository.save(user);
        return "Successfully registered for mentorship: " + mentorship.getTitle();
    }

    @Transactional(readOnly = true)
    public List<User> getRegisteredUsers(Long mentorshipId) {
        Mentorship mentorship = mentorshipRepository.findById(mentorshipId)
                .orElseThrow(() -> new RuntimeException("Mentorship not found"));
        return new ArrayList<>(mentorship.getRegisteredUsers());
    }

    /**
     * ✅ FIX: This method is now correct.
     * It finds the mentorship, gets all registered users,
     * removes the association from each user (which cleans the join table),
     * and then safely deletes the mentorship.
     */
    @Transactional
    public boolean deleteMentorship(Long mentorshipId) {
        // 1. Find the mentorship
        Optional<Mentorship> mentorshipOpt = mentorshipRepository.findById(mentorshipId);

        if (mentorshipOpt.isEmpty()) {
            return false; // Not found
        }

        Mentorship mentorship = mentorshipOpt.get();

        // 2. Get all users registered for it
        Set<User> registeredUsers = mentorship.getRegisteredUsers();

        // 3. Iterate and remove the association from the owning side (User)
        // This will delete the entries from the 'user_mentorship_registrations' join table
        for (User user : registeredUsers) {
            user.getRegisteredMentorships().remove(mentorship);
        }

        // 4. Now, it's safe to delete the mentorship
        mentorshipRepository.delete(mentorship);
        
        return true;
    }
}