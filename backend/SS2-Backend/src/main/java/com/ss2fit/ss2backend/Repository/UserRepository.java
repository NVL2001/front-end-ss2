package com.ss2fit.ss2backend.Repository;

import com.ss2fit.ss2backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findUserByUsername(String username);
}
