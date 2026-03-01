package com.ATME.College.Alumni.Placement.Management.System.DTO;

import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String role; // "ADMIN" or "USER"

    // ✅ New fields
    private String usn;
    private String branch;
    private String passoutYear;
}
