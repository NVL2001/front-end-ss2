package com.ss2fit.ss2backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Data
@Getter
@Setter
public class LoginResponse {
    private String jwtToken;
    private String username;
}
