package com.ATME.College.Alumni.Placement.Management.System.Service;

import com.ATME.College.Alumni.Placement.Management.System.Model.Admin;
import com.ATME.College.Alumni.Placement.Management.System.Repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepo;
    private final PasswordEncoder encoder;

    public Admin register(Admin admin) {
        // Encode password exactly once before saving
        admin.setPassword(encoder.encode(admin.getPassword()));
        return adminRepo.save(admin);
    }

    public Admin findByEmail(String email) {
        return adminRepo.findByEmail(email);
    }
}
