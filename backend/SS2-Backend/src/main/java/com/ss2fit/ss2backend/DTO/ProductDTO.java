package com.ss2fit.ss2backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductDTO {
    private String id;
    private String name;
    private String description;
    private double price;
    private Integer quantity;
    private Date createdDate;
    private String categoryName;
    @JsonProperty("discount")
    private DiscountDTO discountDTO;
    private List<String> productImages;
    private Double discountPrice = null;

    public ProductDTO(String id, String name, String description, double price, Integer quantity, Date createdDate, String categoryName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.createdDate = createdDate;
        this.categoryName = categoryName;
    }
}
