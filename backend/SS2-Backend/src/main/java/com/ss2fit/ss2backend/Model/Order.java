package com.ss2fit.ss2backend.Model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Order {
    @Id
    private String id;
    private double totalMoney;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum('PENDING','REJECT', 'COMPLETE')")
    private OrderStatus status;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetail;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Date createdDate;

    public enum OrderStatus {
        COMPLETE("COMPLETE"), REJECT("REJECT"),
        PENDING("PENDING");

        private String code;

        private OrderStatus(String code) {
            this.code = code;
        }

        public String getCode() {
            return code;
        }
    }
}
