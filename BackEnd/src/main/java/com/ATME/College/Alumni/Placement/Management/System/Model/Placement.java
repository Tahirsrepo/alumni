package com.ATME.College.Alumni.Placement.Management.System.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
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
@ToString(exclude = "appliedUsers") // Prevent infinite loops
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;
    private String packageDetails; // e.g., "12 LPA"
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String imageBase64;

    // ✅ NEW: Relationship to Users who applied (Inverse Side)
    @ManyToMany(mappedBy = "appliedPlacements")
    private Set<User> appliedUsers = new HashSet<>();
}