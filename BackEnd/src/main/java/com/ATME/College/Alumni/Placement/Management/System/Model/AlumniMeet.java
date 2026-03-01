package com.ATME.College.Alumni.Placement.Management.System.Model;

// ✅ FIX: Import these
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
@ToString(exclude = "registeredAlumni")

// ✅ FIX: Add this annotation block
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id")
public class AlumniMeet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate date;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String imageBase64;

    @ManyToMany(mappedBy = "registeredMeets")
    private Set<Alumni> registeredAlumni = new HashSet<>();
}