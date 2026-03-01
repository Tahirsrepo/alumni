package com.ATME.College.Alumni.Placement.Management.System.Controller;

import com.ATME.College.Alumni.Placement.Management.System.Model.Placement;
import com.ATME.College.Alumni.Placement.Management.System.Model.User; // ✅ Import
import com.ATME.College.Alumni.Placement.Management.System.Service.PlacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PlacementController {

    private final PlacementService placementService;

    // Create
    @PostMapping
    public ResponseEntity<Placement> createPlacement(@RequestBody Placement placement) {
        return ResponseEntity.ok(placementService.createPlacement(placement));
    }

    // Get all
    @GetMapping
    public ResponseEntity<List<Placement>> getAllPlacements() {
        return ResponseEntity.ok(placementService.getAllPlacements());
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<Placement> getPlacementById(@PathVariable("id") Long id) {
        return placementService.getPlacementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Placement> updatePlacement(@PathVariable("id") Long id,
                                                     @RequestBody Placement placement) {
        return placementService.updatePlacement(id, placement)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlacement(@PathVariable("id") Long id) {
        boolean deleted = placementService.deletePlacement(id);
        if (deleted) return ResponseEntity.ok("Placement deleted successfully");
        else return ResponseEntity.notFound().build();
    }

    // ✅ NEW: Endpoint for user to apply
    @PostMapping("/apply")
    public ResponseEntity<String> applyForPlacement(
            @RequestParam("userId") Long userId,
            @RequestParam("placementId") Long placementId) {
        try {
            String response = placementService.applyForPlacement(userId, placementId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ NEW: Endpoint to get applicants
    @GetMapping("/{placementId}/applicants")
    public ResponseEntity<List<User>> getPlacementApplicants(
            @PathVariable("placementId") Long placementId) {
        try {
            return ResponseEntity.ok(placementService.getApplicantsForPlacement(placementId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}