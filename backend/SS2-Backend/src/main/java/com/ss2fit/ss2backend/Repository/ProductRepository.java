package com.ss2fit.ss2backend.Repository;

import com.ss2fit.ss2backend.DTO.ProductDTO;
import com.ss2fit.ss2backend.Model.Category;
import com.ss2fit.ss2backend.Model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
//    @Query("SELECT new com.ss2fit.ss2backend.DTO.ProductDTO(p.id, p.name, p.description, p.price, p.quantity, p.created_date, p.category.name) from Product p")
//    public List<ProductDTO> getAllProductDTO();
//    @Query("select new com.ss2fit.ss2backend.DTO.ProductDTO(p.id, p.name, p.description, p.price, p.quantity, p.created_date, p.category.name) from Product p join p.category c where p.category.name = :categoryName")
//    public Optional<List<ProductDTO>> getProductsByCategory(@Param("categoryName") String categoryName);
//    @Query("select new com.ss2fit.ss2backend.DTO.ProductDTO(p.id, p.name, p.description, p.price, p.quantity, p.created_date, p.category.name) from Product p join p.discountProducts dp ")
//    public List<ProductDTO> getAllProductsDTO2();
      List<Product> findProductsByCategoryName(String categoryName);
      List<Product> findProductsByCategory(Category category);
      List<Product> findByIdIn(List<String> ids);
      void deleteById(String id);
      @Query("SELECT p FROM Product p " +
              "left join p.discountProducts pd " +
              "left join Discount d on pd.discount.code = d.code " +
              "where (CURDATE() > pd.discount.startDate AND CURDATE() < pd.discount.endDate) OR d.code is null")
      List<Product> findProductInDateRange(@Param("currentDate") Date date);

      @Query("SELECT p FROM Product p " +
              "left join p.discountProducts pd " +
              "left join Discount d on pd.discount.code = d.code " +
              "where CURDATE() >= pd.discount.startDate AND CURDATE() <= pd.discount.endDate")
      List<Product> findProductsCurrentlyDiscount();


}
