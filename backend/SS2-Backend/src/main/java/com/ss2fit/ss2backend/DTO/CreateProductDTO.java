package com.ss2fit.ss2backend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class CreateProductDTO {
    private String name;
    private String description;
    private double price;
    private Integer quantity;
    private Date createdDate;
    private String categoryName;
}
