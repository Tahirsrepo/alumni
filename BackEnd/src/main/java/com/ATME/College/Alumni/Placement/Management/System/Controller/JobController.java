package com.ATME.College.Alumni.Placement.Management.System.Controller;

import com.ATME.College.Alumni.Placement.Management.System.Model.Job;
import com.ATME.College.Alumni.Placement.Management.System.Model.User;
import com.ATME.College.Alumni.Placement.Management.System.Service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Adjust as needed
public class JobController {

    private final JobService jobService;

    // Alumni posts a job
    @PostMapping("/post")
    public ResponseEntity<Job> postJob(
            @RequestBody Job job,
            @RequestParam("alumniId") Long alumniId) { // ✅ FIX
        try {
            Job createdJob = jobService.createJob(job, alumniId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Get all jobs
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable("id") Long id) { // ✅ FIX
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // User applies for a job
    @PostMapping("/apply")
    public ResponseEntity<String> applyForJob(
            @RequestParam("userId") Long userId, // ✅ FIX
            @RequestParam("jobId") Long jobId) { // ✅ FIX
        try {
            String response = jobService.applyForJob(userId, jobId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Alumni sees who applied for their job
    @GetMapping("/{jobId}/applicants")
    public ResponseEntity<List<User>> getJobApplicants(@PathVariable("jobId") Long jobId) { // ✅ FIX
        try {
            return ResponseEntity.ok(jobService.getApplicantsForJob(jobId));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Alumni deletes a job posting
    @DeleteMapping("/{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable Long jobId) {
        if (jobService.deleteJob(jobId)) {
            return ResponseEntity.ok("Job deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
        }
    }
}