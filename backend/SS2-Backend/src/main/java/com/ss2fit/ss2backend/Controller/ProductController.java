package com.ss2fit.ss2backend.Controller;

import com.ss2fit.ss2backend.DTO.CreateDiscountDTO;
import com.ss2fit.ss2backend.DTO.CreateProductDTO;
import com.ss2fit.ss2backend.DTO.ItemPage;
import com.ss2fit.ss2backend.DTO.ProductDTO;
import com.ss2fit.ss2backend.Model.Product;
import com.ss2fit.ss2backend.Repository.ProductRepository;
import com.ss2fit.ss2backend.Service.DiscountService;
import com.ss2fit.ss2backend.Service.FilesStorageService;
import com.ss2fit.ss2backend.Service.ProductService;
import com.ss2fit.ss2backend.utils.Exceptions.CategoryNotFoundException;
import com.ss2fit.ss2backend.utils.Exceptions.ProductNotFoundException;
import io.github.classgraph.Resource;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product/")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private FilesStorageService filesStorageService;
    @Autowired
    private DiscountService discountService;

    @GetMapping("/products")
    public ItemPage<ProductDTO> getAllProducts(@RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "createdDate") String sort,
            @RequestParam(defaultValue = "desc") String sortOrder) {
        return productService.getAllProducts(page, size, sort, sortOrder);
    }

    @GetMapping("/get-product/{id}")
    public ResponseEntity getProduct(@PathVariable(name = "id") String id) {
        try {
            ProductDTO product = productService.getProductDTO(id);
            return new ResponseEntity<>(
                    product, HttpStatus.OK);
        } catch (ProductNotFoundException e) {
            return new ResponseEntity<>(
                    "Product Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-product-by-category/{categoryName}")
    public ResponseEntity getProductByCategory(@PathVariable(name = "categoryName") String categoryName) {
        try {
            List<ProductDTO> productDTOList = productService.getProductsByCategoryName(categoryName);
            return new ResponseEntity<>(
                    productDTOList, HttpStatus.OK);
        } catch (CategoryNotFoundException e) {
            return new ResponseEntity("Category Not Found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PreAuthorize("isAuthenticated() and hasAnyAuthority('STAFF', 'ADMIN')")
    @GetMapping("/test")
    public List<Product> test() {
        List<Product> products = productRepository.findProductInDateRange(new Date());

        return products;
        // products.stream().forEach(
        // product -> {
        // product.getDiscountProducts().stream().forEach(
        // discountProduct -> {
        // discountProduct.setProduct(null);
        // }
        // );
        // product.setCategory(null);
        // }
        // );
        // return products;
    }

    @PreAuthorize("isAuthenticated() and hasAnyAuthority('STAFF')")
    @PostMapping("/create-product")
    public String createProduct(@RequestHeader String host,
            @ModelAttribute CreateProductDTO createProductDTO,
            @RequestParam("images") MultipartFile[] multipartFile) {

        List<String> imagesList = Arrays.stream(multipartFile).map(
                file -> {
                    try {
                        return host + filesStorageService.save(file);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }).collect(Collectors.toList());
        productService.createProduct(createProductDTO, imagesList);
        return "OK";
    }

    @PreAuthorize("isAuthenticated() and hasAnyAuthority('STAFF')")
    @PostMapping("/apply-discount")
    public ResponseEntity createAndApplyDiscount(@RequestBody CreateDiscountDTO createDiscountDTO) {
        try {
            discountService.createAndApplyDiscount(createDiscountDTO.getDiscountDTO(),
                    createDiscountDTO.getProductIds());

            return new ResponseEntity<>("OK", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PreAuthorize("isAuthenticated() and hasAnyAuthority('STAFF')")
    @PostMapping("/delete-product")
    public ResponseEntity deleteProduct(@RequestParam("productId") String productId) {
        try {
            productService.deleteProduct(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EmptyResultDataAccessException err) {
            return new ResponseEntity("Product Not Found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/discount-product")
    public ResponseEntity getDiscountProduct() {
        return ResponseEntity.ok().body(
                productService.getDiscountProduct());
    }

    @GetMapping("/images/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = (Resource) filesStorageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getURL().getFile() + "\"")
                .body(file);
    }

    @GetMapping("/products-field")
    public ResponseEntity getProductFieldsToQuery() {
        return ResponseEntity.ok().body(
                List.of("createdDate", "price", "name", "quantity"));
    }

}
