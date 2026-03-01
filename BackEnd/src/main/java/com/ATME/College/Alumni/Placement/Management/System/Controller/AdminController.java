package com.ATME.College.Alumni.Placement.Management.System.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ATME.College.Alumni.Placement.Management.System.DTO.*;
import com.ATME.College.Alumni.Placement.Management.System.Model.Admin;
import com.ATME.College.Alumni.Placement.Management.System.Security.JwtUtil;
import com.ATME.College.Alumni.Placement.Management.System.Service.AdminService;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class AdminController {

    private final AdminService adminService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // Admin login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Admin admin = adminService.findByEmail(req.getEmail());
        if (admin == null) {
            return ResponseEntity.status(401).body("Admin not found");
        }

        // Compare raw password from request vs encoded password in DB
        if (!passwordEncoder.matches(req.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        String token = jwtUtil.generateToken(admin.getEmail());
        return ResponseEntity.ok(new JwtResponse(token));
    }

    // Admin signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (adminService.findByEmail(req.getEmail()) != null) {
            return ResponseEntity.status(409).body("Email already exists");
        }

        Admin admin = Admin.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword()) // plain password here
                .build();

        adminService.register(admin); // service will encode password ✅

        return ResponseEntity.ok("Admin registered successfully");
    }

}
