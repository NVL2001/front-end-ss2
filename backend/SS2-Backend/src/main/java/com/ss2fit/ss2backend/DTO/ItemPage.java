package com.ss2fit.ss2backend.DTO;

import lombok.*;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class ItemPage<T> {
    private List<T> pageItems;
    private Integer currentPage;
    private Long totalItems;
    private Integer totalPages;
}
