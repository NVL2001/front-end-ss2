package com.ss2fit.ss2backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Setter
@AllArgsConstructor
@Getter
public class CategoryDTO {
    private String id;
    private String name;
    private List<ProductDTO> productDTOList;
}
