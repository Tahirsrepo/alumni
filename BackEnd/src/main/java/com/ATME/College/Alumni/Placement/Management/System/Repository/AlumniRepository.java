package com.ATME.College.Alumni.Placement.Management.System.Repository;

import com.ATME.College.Alumni.Placement.Management.System.Model.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, Long> {
    Optional<Alumni> findByEmail(String email);

    List<Alumni> findByUsnContainingIgnoreCase(String usn);
    List<Alumni> findByNameContainingIgnoreCase(String name);
    List<Alumni> findByYearOfGraduation(String yearOfGraduation);
}
