package com.ss2fit.ss2backend.DTO;

import com.ss2fit.ss2backend.Model.Discount;
import lombok.*;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DiscountDTO {
    private String code;
    private String description;
    private Double discountPercent;
    private String startDate;
    private String endDate;

}
