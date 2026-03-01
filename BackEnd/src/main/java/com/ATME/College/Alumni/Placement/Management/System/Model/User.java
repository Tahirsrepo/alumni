package com.ATME.College.Alumni.Placement.Management.System.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
// ✅ FIX: Added "appliedPlacements" to exclude
@ToString(exclude = {"appliedJobs", "registeredMentorships", "appliedPlacements"}) 
@Table(name = "user") 
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String role;
    private String usn;
    private String branch;
    private String passoutYear;

    // --- Existing Relationships ---
    @ManyToMany
    @JoinTable(
        name = "user_job_applications",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "job_id")
    )
    private Set<Job> appliedJobs = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "user_mentorship_registrations",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "mentorship_id")
    )
    private Set<Mentorship> registeredMentorships = new HashSet<>();

    // ✅ NEW: Relationship for Placement Applications (Owning Side)
    @ManyToMany
    @JoinTable(
        name = "user_placement_applications",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "placement_id")
    )
    private Set<Placement> appliedPlacements = new HashSet<>();


    // --- UserDetails Methods ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }
    // ... other UserDetails methods ...
    @Override
    public String getUsername() { return email; }
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}