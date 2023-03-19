package com.ss2fit.ss2backend.Service;

import com.ss2fit.ss2backend.DTO.RegisterRequest;
import com.ss2fit.ss2backend.Model.CustomUserDetails;
import com.ss2fit.ss2backend.Model.Role;
import com.ss2fit.ss2backend.Model.User;
import com.ss2fit.ss2backend.Repository.RoleRepository;
import com.ss2fit.ss2backend.Repository.UserRepository;
import com.ss2fit.ss2backend.utils.GenerateRandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user);
    }

    public UserDetails loadUserById(String userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new Exception("User not found");
        }

        return new CustomUserDetails(user.get());
    }

    public void registerUser(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setFirstName(registerRequest.getFirstName());
        user.setId(GenerateRandomString.generate());
        user.setLastName(registerRequest.getLastName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setCreatedDate(new Date());
        user.setRoles(Set.of(roleRepository.findById(1).get()));

        userRepository.save(user);
    }
}
