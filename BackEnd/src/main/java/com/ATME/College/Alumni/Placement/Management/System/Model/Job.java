package com.ATME.College.Alumni.Placement.Management.System.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = {"postedByAlumni", "appliedUsers"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String companyName;
    private String location;
    private String applyLink;
    private LocalDate postedDate;

    // ✅ Link to the Alumni who posted it
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alumni_id")
    private Alumni postedByAlumni;

    // ✅ Link to the Users who applied
    @ManyToMany(mappedBy = "appliedJobs")
    private Set<User> appliedUsers = new HashSet<>();
}