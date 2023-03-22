package com.ss2fit.ss2backend.Service;

import com.ss2fit.ss2backend.DTO.DiscountDTO;
import com.ss2fit.ss2backend.Model.Discount;
import com.ss2fit.ss2backend.Model.DiscountProduct;
import com.ss2fit.ss2backend.Model.Product;
import com.ss2fit.ss2backend.Repository.DiscountProductRepository;
import com.ss2fit.ss2backend.Repository.DiscountRepository;
import com.ss2fit.ss2backend.Repository.ProductRepository;
import com.ss2fit.ss2backend.utils.DateFormat;
import com.ss2fit.ss2backend.utils.GenerateRandomString;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiscountService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DiscountRepository discountRepository;
    @Autowired
    private DiscountProductRepository discountProductRepository;
    @Autowired
    private ModelMapper modelMapper;

    public void createAndApplyDiscount(DiscountDTO discountDTO, List<String> ids) throws ParseException {
        List<Product> products = productRepository.findByIdIn(ids);
        Discount discount = modelMapper.map(discountDTO, Discount.class);
        discount.setStartDate(DateFormat.parse(discountDTO.getStartDate()));
        discount.setEndDate(DateFormat.parse(discountDTO.getEndDate()));
        discount.setCode(GenerateRandomString.generate());
        discount.setCreatedDate(new Date());
        discountRepository.save(discount);
        List<DiscountProduct> discountProducts = products.stream().map(product -> {
            DiscountProduct discountProduct = new DiscountProduct();
            discountProduct.setDiscount(discount);
            discountProduct.setDiscountPrice(
                    calculateDiscount(product.getPrice(), discount.getDiscountPercent())
            );
            discountProduct.setProduct(product);
            return discountProduct;

        }).collect(Collectors.toList());

        discountProductRepository.saveAll(discountProducts);

    }

    public double calculateDiscount(Double productPrice, double discountPercent) {
        return productPrice - ((discountPercent / 100) * productPrice);
    }

}
