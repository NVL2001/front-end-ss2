package com.ss2fit.ss2backend.Service;


import com.ss2fit.ss2backend.Config.jwt.JwtTokenProvider;
import com.ss2fit.ss2backend.DTO.LoginRequest;
import com.ss2fit.ss2backend.DTO.LoginResponse;
import com.ss2fit.ss2backend.Model.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtTokenProvider.generateToken(
                (CustomUserDetails) authentication.getPrincipal()
        );
        return new LoginResponse(jwtToken,
                ((CustomUserDetails) authentication.getPrincipal()).getUsername());
    }

    public CustomUserDetails getCurrentUser() {
        return (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
