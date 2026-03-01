package com.ATME.College.Alumni.Placement.Management.System.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ATME.College.Alumni.Placement.Management.System.DTO.*;
import com.ATME.College.Alumni.Placement.Management.System.Model.User;
import com.ATME.College.Alumni.Placement.Management.System.Security.JwtUtil;
import com.ATME.College.Alumni.Placement.Management.System.Service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    // ✅ Signup (Register new user)
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (userService.findByEmail(req.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword())
                .role("USER")
                .usn(req.getUsn())
                .branch(req.getBranch())
                .passoutYear(req.getPassoutYear())
                .build();

        userService.register(user);
        return ResponseEntity.ok("User Registered Successfully");
    }

    // ✅ Login (Unchanged)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User user = userService.findByEmail(req.getEmail());
        if (user == null || !userService.validateUser(req.getEmail(), req.getPassword())) {
            return ResponseEntity.status(403).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(req.getEmail());

        // ✅ Return full user details with token
        LoginResponse response = new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getUsn(),
                user.getBranch(),
                user.getPassoutYear());

        return ResponseEntity.ok(response);
    }

    // ✅ Get all users (NEW)
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
