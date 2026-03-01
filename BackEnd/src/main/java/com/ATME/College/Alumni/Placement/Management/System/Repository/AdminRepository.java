package com.ATME.College.Alumni.Placement.Management.System.Repository;

import com.ATME.College.Alumni.Placement.Management.System.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}
