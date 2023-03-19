package com.ss2fit.ss2backend.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO {
    @JsonProperty("product")
    private ProductDTO productDTO;
    private Integer orderQuantity;
}
