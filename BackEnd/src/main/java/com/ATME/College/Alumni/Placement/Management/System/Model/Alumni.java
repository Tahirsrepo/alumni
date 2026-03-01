package com.ATME.College.Alumni.Placement.Management.System.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = { "registeredMeets", "postedJobs", "postedMentorships" })
@Table(name = "alumni")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Alumni {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String usn;
    private String yearOfGraduation;
    private String branch;
    private String email;
    private String phone;
    private String password;

    @ManyToMany
    @JoinTable(name = "alumni_meet_registration", joinColumns = @JoinColumn(name = "alumni_id"), inverseJoinColumns = @JoinColumn(name = "meet_id"))
    @Builder.Default
    private Set<AlumniMeet> registeredMeets = new HashSet<>();

    @OneToMany(mappedBy = "postedByAlumni", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @Builder.Default
    private Set<Job> postedJobs = new HashSet<>();

    @OneToMany(mappedBy = "postedByAlumni", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @Builder.Default
    private Set<Mentorship> postedMentorships = new HashSet<>();
}
