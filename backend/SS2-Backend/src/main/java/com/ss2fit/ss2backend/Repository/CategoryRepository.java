package com.ss2fit.ss2backend.Repository;


import com.ss2fit.ss2backend.DTO.CategoryDTO;
import com.ss2fit.ss2backend.DTO.ProductDTO;
import com.ss2fit.ss2backend.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
   boolean existsByName(String name);
   Category findByName(String name);
   void deleteByName(String name);
}
