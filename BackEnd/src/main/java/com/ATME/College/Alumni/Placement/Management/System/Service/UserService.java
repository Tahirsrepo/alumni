package com.ATME.College.Alumni.Placement.Management.System.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ATME.College.Alumni.Placement.Management.System.Model.User;
import com.ATME.College.Alumni.Placement.Management.System.Repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    // Register a new user
    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword())); // Hash password
        return userRepo.save(user);
    }

    // Find user by email
    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    // Validate login credentials manually
    public boolean validateUser(String email, String rawPassword) {
        User user = userRepo.findByEmail(email);
        if (user == null)
            return false;
        return encoder.matches(rawPassword, user.getPassword());
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

}
