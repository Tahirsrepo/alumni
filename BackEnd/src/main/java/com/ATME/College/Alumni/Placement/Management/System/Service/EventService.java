package com.ATME.College.Alumni.Placement.Management.System.Service;

import com.ATME.College.Alumni.Placement.Management.System.Model.Event;
import com.ATME.College.Alumni.Placement.Management.System.Repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository repo;

    // Create
    public Event add(Event e) {
        return repo.save(e);
    }

    // Get all
    public List<Event> getAll() {
        return repo.findAll();
    }

    // Get by ID
    public Optional<Event> getById(Long id) {
        return repo.findById(id);
    }

    // Update
    public Optional<Event> update(Long id, Event updatedEvent) {
        return repo.findById(id).map(e -> {
            e.setTitle(updatedEvent.getTitle());
            e.setDescription(updatedEvent.getDescription());
            e.setDate(updatedEvent.getDate());
            e.setImageBase64(updatedEvent.getImageBase64());
            return repo.save(e);
        });
    }

    // Delete
    public boolean delete(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
