package com.ATME.College.Alumni.Placement.Management.System.Repository;

import com.ATME.College.Alumni.Placement.Management.System.Model.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementRepository extends JpaRepository<Placement, Long> {
}
