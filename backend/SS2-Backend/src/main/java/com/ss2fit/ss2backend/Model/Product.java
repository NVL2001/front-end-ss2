package com.ss2fit.ss2backend.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.Min;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Entity
@Data
public class Product {
   @Id
   private String id;
   private String name;
//   @Column(columnDefinition = "TEXT")
   @Lob
   private String description;
   private double price;
   @Min(value = 0)
   private Integer quantity;
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "category_id")
   private Category category;
   @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
   @JoinColumn(name = "product_id")
   private List<ProductImage> productImages = new ArrayList<>();
   @OneToMany(mappedBy = "product")
   @JsonManagedReference
   private List<DiscountProduct> discountProducts;
   private Date createdDate;

   @PreRemove
   private void preRemove() {
//      this.category = null;
      discountProducts.forEach( child -> child.setProduct(null));
   }

   public void addProductImages(ProductImage productImage) {
      productImages.add(productImage);
   }

   public DiscountProduct takeCurrentDiscountProduct() {
      if (this.discountProducts.size() > 0) {
         Date currentDate = new Date();
         Optional<DiscountProduct> dp = this.discountProducts.stream().filter(
                 discountProduct ->
                    currentDate.after(discountProduct.getDiscount().getStartDate())
                            && currentDate.before(discountProduct.getDiscount().getEndDate())
         ).findFirst();
         return dp.orElse(null);
      }
      return null;
   }

}
