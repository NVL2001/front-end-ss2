package com.ss2fit.ss2backend.Config;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, IOException {
        if (authException instanceof BadCredentialsException
                && request.getServletPath().equals("/api/auth/login")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Login Failed! Wrong credentials!");
            return;
        }
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "You are not authorized to access this resource.");
    }
}
    