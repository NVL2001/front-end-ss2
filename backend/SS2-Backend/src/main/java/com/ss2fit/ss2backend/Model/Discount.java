package com.ss2fit.ss2backend.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


/*
Có nhiều cách để thực hiện:
1, Tạo thêm 1 bảng discount
2, 1 products có nhiều discount
2.1.1, Khi query Product sẽ query luôn tất cả discount
2.1.2, Check discount nào đang active thì apply function discount vào (query nhiều)

2.2.1, Tạo thêm 1 cột discount trong bảng product
2.2.2, Tạo 1 luồng background chạy để update product discount hàng ngày (query tất cả discount active = TRUE)
2.2.3, Nếu discount active thì apply giá cho bảng discount price trên product

 */

/*

 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Discount {
    @Id
    private String code;
    private String description;
    private Double discountPercent;
    private Date createdDate;
    private Date startDate;
    private Date endDate;

}
