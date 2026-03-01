package com.ATME.College.Alumni.Placement.Management.System.Service;

import com.ATME.College.Alumni.Placement.Management.System.Model.Placement;
import com.ATME.College.Alumni.Placement.Management.System.Model.User;
import com.ATME.College.Alumni.Placement.Management.System.Repository.PlacementRepository;
import com.ATME.College.Alumni.Placement.Management.System.Repository.UserRepository; // ✅ Import
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // ✅ Import

import java.util.ArrayList; // ✅ Import
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlacementService {

    private final PlacementRepository placementRepo;
    private final UserRepository userRepo; // ✅ Inject UserRepository

    // Create
    public Placement createPlacement(Placement placement) {
        return placementRepo.save(placement);
    }

    // Get all
    public List<Placement> getAllPlacements() {
        return placementRepo.findAll();
    }

    // Get by ID
    public Optional<Placement> getPlacementById(Long id) {
        return placementRepo.findById(id);
    }

    // Update
    public Optional<Placement> updatePlacement(Long id, Placement updatedPlacement) {
        return placementRepo.findById(id).map(p -> {
            p.setCompany(updatedPlacement.getCompany());
            p.setRole(updatedPlacement.getRole());
            p.setPackageDetails(updatedPlacement.getPackageDetails());
            return placementRepo.save(p);
        });
    }

    // Delete
    public boolean deletePlacement(Long id) {
        if (placementRepo.existsById(id)) {
            placementRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ NEW: Method for user to apply
    @Transactional
    public String applyForPlacement(Long userId, Long placementId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Placement placement = placementRepo.findById(placementId)
                .orElseThrow(() -> new RuntimeException("Placement not found"));

        if (user.getAppliedPlacements().contains(placement)) {
            return "User already applied for this placement";
        }

        // Sync both sides
        user.getAppliedPlacements().add(placement);
        placement.getAppliedUsers().add(user);

        userRepo.save(user); // Save the owning side
        return "Successfully applied for placement at " + placement.getCompany();
    }

    // ✅ NEW: Method to get all applicants for a placement
    @Transactional(readOnly = true)
    public List<User> getApplicantsForPlacement(Long placementId) {
        Placement placement = placementRepo.findById(placementId)
                .orElseThrow(() -> new RuntimeException("Placement not found"));
        
        // Eagerly fetch the list
        return new ArrayList<>(placement.getAppliedUsers());
    }
}