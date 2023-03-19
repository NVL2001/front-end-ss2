package com.ss2fit.ss2backend.Controller;


import com.ss2fit.ss2backend.Service.CategoryService;
import com.ss2fit.ss2backend.utils.Exceptions.CategoryExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    public CategoryService categoryService;

    @PreAuthorize("isAuthenticated() and hasAnyAuthority('STAFF')")
    @PostMapping("/create-category")
    public ResponseEntity newCategory(@RequestParam("name") String name) {
        try {
            categoryService.createCategory(name);
            return new ResponseEntity(
                    HttpStatus.CREATED
            );
        } catch (CategoryExistException ce) {
            return ResponseEntity.badRequest().body(ce.getMessage());
        }
    }

    @PreAuthorize("isAuthenticated() and hasAnyAuthority('STAFF')")
    @PutMapping("/update-category")
    public void updateCategory(@RequestParam("id") String id,
                               @RequestParam("newName") String newName) {
        categoryService.updateCategory(id, newName);
    }

    @GetMapping("/get-categories")
    public ResponseEntity getCategories() {
        return new ResponseEntity<>(
                categoryService.getAllCategories(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("isAuthenticated() and hasAnyAuthority('STAFF')")
    @DeleteMapping("/delete-category")
    public ResponseEntity deleteCategory(@RequestParam("categoryName") String categoryName) {
        try {
            categoryService.deleteCategory(categoryName);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
