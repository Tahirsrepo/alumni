package com.ATME.College.Alumni.Placement.Management.System.Controller;

import com.ATME.College.Alumni.Placement.Management.System.Model.Alumni;
import com.ATME.College.Alumni.Placement.Management.System.Service.AlumniService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*; 

@RestController
@RequestMapping("/api/alumni")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlumniController {

    private final AlumniService alumniService;

    // ✅ Register new alumni
    @PostMapping("/register")
    public ResponseEntity<Alumni> register(@RequestBody Alumni alumni) {
        Alumni registered = alumniService.register(alumni);
        return ResponseEntity.ok(registered);
    }

    // ✅ Login (returns token + alumni details)
     @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Alumni request) {
        Optional<Map<String, Object>> result = alumniService.login(request.getEmail(), request.getPassword());

        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Invalid email or password");
            return ResponseEntity.status(401).body(error);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchAlumni(@RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(alumniService.search(keyword));
    }

    @GetMapping("/batch/{year}")
    public ResponseEntity<?> getByBatch(@PathVariable("year") String year) {
        if (!year.matches("^(19|20)\\d{2}$")) {
            return ResponseEntity.badRequest().body("Invalid year format (use e.g., 2025)");
        }
        return ResponseEntity.ok(alumniService.getByBatch(year));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllAlumni() {
        return ResponseEntity.ok(alumniService.getAllAlumni());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAlumni(@PathVariable("id") Long id) {
        boolean deleted = alumniService.deleteAlumni(id);
        if (deleted) {
            return ResponseEntity.ok("Alumni deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Alumni not found.");
        }
    }
}
