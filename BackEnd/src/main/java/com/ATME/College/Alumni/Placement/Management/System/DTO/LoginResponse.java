package com.ATME.College.Alumni.Placement.Management.System.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Long id;
    private String name;
    private String email;
    private String role;
    private String usn;
    private String branch;
    private String passoutYear;
}
