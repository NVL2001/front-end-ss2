package com.ss2fit.ss2backend.Service;


import com.ss2fit.ss2backend.Model.Category;
import com.ss2fit.ss2backend.Model.Product;
import com.ss2fit.ss2backend.Repository.CategoryRepository;
import com.ss2fit.ss2backend.Repository.ProductRepository;
import com.ss2fit.ss2backend.utils.Exceptions.CategoryExistException;
import com.ss2fit.ss2backend.utils.Exceptions.CategoryNotFoundException;
import com.ss2fit.ss2backend.utils.GenerateRandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;

    public void createCategory(String categoryName) throws CategoryExistException {
        if (categoryRepository.existsByName(categoryName)) {
            throw new CategoryExistException("Category Already exist");
        }
        Category category = new Category();
        category.setId(GenerateRandomString.generate());
        category.setName(categoryName);

        categoryRepository.save(category);
    }

    public void deleteCategory(String categoryName) {
        Category category = categoryRepository.findByName(categoryName);
        List<Product> products = productRepository.findProductsByCategory(category);
        products.stream().forEach(product -> product.setCategory(null));

        productRepository.saveAll(products);
        categoryRepository.delete(category);
    }

    public void updateCategory(String id, String newName) {
        Category category = categoryRepository.findById(id).orElseThrow();
        category.setName(newName);
        categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
