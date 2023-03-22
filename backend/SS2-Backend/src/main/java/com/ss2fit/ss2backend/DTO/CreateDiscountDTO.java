package com.ss2fit.ss2backend.DTO;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateDiscountDTO {
    private DiscountDTO discountDTO;
    private List<String> productIds;
}
