package com.ss2fit.ss2backend.utils;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageableObject {
    public static Pageable getPage(int page, int size, String sortOption, String sortOrder) {
        Pageable pageable = null;
        Sort sort = sortOrder.equals("asc") ? Sort.by(sortOption).ascending() : Sort.by(sortOption).descending();
        if (sortOption.equals("price")) {
            pageable = PageRequest.of(page, size, sort);
        } else if (sortOption.equals("name")) {
            pageable = PageRequest.of(page, size, sort);
        } else {
            pageable = PageRequest.of(page, size, sort);
        }
        return pageable;
    }
}
