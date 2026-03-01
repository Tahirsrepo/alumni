package com.ATME.College.Alumni.Placement.Management.System.Controller;

import com.ATME.College.Alumni.Placement.Management.System.Model.Event;
import com.ATME.College.Alumni.Placement.Management.System.Service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService service;

    // Create
    @PostMapping("/add")
    public ResponseEntity<Event> add(@RequestBody Event e) {
        return ResponseEntity.ok(service.add(e));
    }

    // Get all
    @GetMapping("/all")
    public ResponseEntity<List<Event>> all() {
        return ResponseEntity.ok(service.getAll());
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getById(@PathVariable("id") Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Event> update(@PathVariable("id") Long id, @RequestBody Event event) {
        return service.update(id, event)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        boolean deleted = service.delete(id);
        if (deleted) return ResponseEntity.ok("Event deleted successfully");
        else return ResponseEntity.notFound().build();
    }
}
