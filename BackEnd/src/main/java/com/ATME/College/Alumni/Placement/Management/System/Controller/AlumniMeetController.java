package com.ATME.College.Alumni.Placement.Management.System.Controller;

import com.ATME.College.Alumni.Placement.Management.System.Model.Alumni;
import com.ATME.College.Alumni.Placement.Management.System.Model.AlumniMeet;
import com.ATME.College.Alumni.Placement.Management.System.Service.AlumniMeetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alumni-meet")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlumniMeetController {

    private final AlumniMeetService alumniMeetService;

    @PostMapping
    public ResponseEntity<AlumniMeet> createMeet(@RequestBody AlumniMeet meet) {
        return ResponseEntity.ok(alumniMeetService.createAlumniMeet(meet));
    }

    @GetMapping
    public ResponseEntity<List<AlumniMeet>> getAllMeets() {
        return ResponseEntity.ok(alumniMeetService.getAllAlumniMeets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniMeet> getMeetById(@PathVariable Long id) {
        return alumniMeetService.getAlumniMeetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerForMeet(
            @RequestParam("alumniId") Long alumniId,
            @RequestParam("meetId") Long meetId) {
        return ResponseEntity.ok(alumniMeetService.registerAlumniForMeet(alumniId, meetId));
    }

    @GetMapping("/{meetId}/participants")
    public ResponseEntity<List<Alumni>> getRegisteredAlumni(@PathVariable("meetId") Long meetId) {
        return ResponseEntity.ok(alumniMeetService.getRegisteredAlumni(meetId));
    }

}
