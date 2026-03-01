package com.ATME.College.Alumni.Placement.Management.System.Service;

import com.ATME.College.Alumni.Placement.Management.System.Model.Alumni;
import com.ATME.College.Alumni.Placement.Management.System.Model.Job;
import com.ATME.College.Alumni.Placement.Management.System.Model.User;
import com.ATME.College.Alumni.Placement.Management.System.Repository.AlumniRepository;
import com.ATME.College.Alumni.Placement.Management.System.Repository.JobRepository;
import com.ATME.College.Alumni.Placement.Management.System.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final AlumniRepository alumniRepository; // Assumed from previous code
    private final UserRepository userRepository;

    @Transactional
    public Job createJob(Job job, Long alumniId) {
        Alumni alumni = alumniRepository.findById(alumniId)
                .orElseThrow(() -> new RuntimeException("Alumni not found"));
        
        job.setPostedByAlumni(alumni);
        job.setPostedDate(LocalDate.now());
        
        return jobRepository.save(job);
    }

    @Transactional(readOnly = true)
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    @Transactional
    public String applyForJob(Long userId, Long jobId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (user.getAppliedJobs().contains(job)) {
            return "Already applied for this job";
        }

        user.getAppliedJobs().add(job);
        job.getAppliedUsers().add(user);
        
        userRepository.save(user);
        return "Successfully applied for job: " + job.getTitle();
    }

    @Transactional(readOnly = true)
    public List<User> getApplicantsForJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return new ArrayList<>(job.getAppliedUsers());
    }

    @Transactional
    public boolean deleteJob(Long jobId) {
        if (jobRepository.existsById(jobId)) {
            jobRepository.deleteById(jobId);
            return true;
        }
        return false;
    }
}