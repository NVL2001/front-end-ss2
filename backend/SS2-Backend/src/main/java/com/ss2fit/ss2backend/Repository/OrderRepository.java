package com.ss2fit.ss2backend.Repository;

import com.ss2fit.ss2backend.Model.Order;
import com.ss2fit.ss2backend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    Page<Order> findAllByUserId(String id, Pageable pageable);
    Page<Order> findOrdersByUserUsername(String username, Pageable pageable);
}
