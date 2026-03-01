package com.ATME.College.Alumni.Placement.Management.System.Controller;

import com.ATME.College.Alumni.Placement.Management.System.Model.Mentorship;
import com.ATME.College.Alumni.Placement.Management.System.Model.User;
import com.ATME.College.Alumni.Placement.Management.System.Service.MentorshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorships")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MentorshipController {

    private final MentorshipService mentorshipService;

    // Alumni posts a mentorship
    // Alumni posts a mentorship
    @PostMapping("/post")
    public ResponseEntity<Mentorship> postMentorship(
            @RequestBody Mentorship mentorship,
            @RequestParam("alumniId") Long alumniId) { // ✅ FIX
        try {
            Mentorship createdMentorship = mentorshipService.createMentorship(mentorship, alumniId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMentorship);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Get all mentorships
    @GetMapping
    public ResponseEntity<List<Mentorship>> getAllMentorships() {
        return ResponseEntity.ok(mentorshipService.getAllMentorships());
    }

    // Get mentorship by ID
    @GetMapping("/{id}")
    public ResponseEntity<Mentorship> getMentorshipById(@PathVariable Long id) {
        return mentorshipService.getMentorshipById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // User registers for a mentorship
    @PostMapping("/register")
    public ResponseEntity<String> registerForMentorship(
            @RequestParam("userId") Long userId, // ✅ FIX
            @RequestParam("mentorshipId") Long mentorshipId) { // ✅ FIX
        try {
            String response = mentorshipService.registerForMentorship(userId, mentorshipId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Alumni sees who registered for their mentorship
    @GetMapping("/{mentorshipId}/registrations")
    public ResponseEntity<List<User>> getMentorshipRegistrations(
            @PathVariable("mentorshipId") Long mentorshipId) { // ✅ FIX: Add ("mentorshipId")
        try {
            return ResponseEntity.ok(mentorshipService.getRegisteredUsers(mentorshipId));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Alumni deletes a mentorship
    @DeleteMapping("/{mentorshipId}")
    public ResponseEntity<String> deleteMentorship(@PathVariable("mentorshipId") Long mentorshipId) { // ✅ FIX
        if (mentorshipService.deleteMentorship(mentorshipId)) {
            return ResponseEntity.ok("Mentorship deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mentorship not found");
        }
    }
}