package com.ss2fit.ss2backend.Service;

import com.ss2fit.ss2backend.DTO.CreateProductDTO;
import com.ss2fit.ss2backend.DTO.DiscountDTO;
import com.ss2fit.ss2backend.DTO.ItemPage;
import com.ss2fit.ss2backend.DTO.ProductDTO;
import com.ss2fit.ss2backend.Model.*;
import com.ss2fit.ss2backend.Repository.CategoryRepository;
import com.ss2fit.ss2backend.Repository.ProductImageRepository;
import com.ss2fit.ss2backend.Repository.ProductRepository;
import com.ss2fit.ss2backend.utils.Exceptions.CategoryNotFoundException;
import com.ss2fit.ss2backend.utils.Exceptions.ProductNotFoundException;
import com.ss2fit.ss2backend.utils.GenerateRandomString;
import com.ss2fit.ss2backend.utils.PageableObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository,
                          ModelMapper modelMapper, ProductImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    public ProductDTO getProductDTO(String id) throws ProductNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return applyDiscountAndConvertToDTO(product.get());
        } else {
            throw new ProductNotFoundException("Product Not Found");
        }
    }

    public Product getProduct(String id) {
       return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product Not Found"));
    }

    public List<ProductDTO> getProductsByCategoryName(String categoryName) throws CategoryNotFoundException {
        Optional<List<Product>> products = Optional.of(productRepository.findProductsByCategoryName(categoryName));
        return products.get().stream().
                map(this::applyDiscountAndConvertToDTO).collect(Collectors.toList());
    }

    public ItemPage<ProductDTO> getAllProducts(int page, int size, String sortOption, String sortOrder) {
        Pageable pageable = PageableObject.getPage(page, size, sortOption, sortOrder);

        Page<Product> productsPage = productRepository.findAll(pageable);
        List<ProductDTO> productDTOList = productsPage.getContent().stream().
                map(this::applyDiscountAndConvertToDTO).collect(Collectors.toList());

        return paginate(
                productsPage.getNumber(),
                productsPage.getTotalElements(),
                productsPage.getTotalPages(),
                productDTOList
        );
    }

    public void createProduct(CreateProductDTO productDTO, List<String> imageURLs) {
        if (!categoryRepository.existsByName(productDTO.getCategoryName())) {
            categoryRepository.save(
                    new Category(
                            GenerateRandomString.generate(),
                            productDTO.getCategoryName()
                    )
            );
        }
        Product product = modelMapper.map(productDTO, Product.class);
        product.setId(GenerateRandomString.generate());
        product.setCreatedDate(new Date());
        product.setCategory(
                categoryRepository.findByName(productDTO.getCategoryName())
        );
        List<ProductImage> productImages = imageURLs.stream().map(
                imageURL -> {
                    ProductImage productImage = new ProductImage();
                    productImage.setImageURL(imageURL);
                    //product.addProductImages(productImage);
                    return productImage;
                }
        ).collect(Collectors.toList());
        product.setProductImages(productImages);
        productRepository.save(product);
    }

    private ProductDTO applyDiscountAndConvertToDTO(Product product) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        productDTO.setCategoryName(
                product.getCategory() == null ? null : product.getCategory().getName()
        );
        productDTO.setProductImages(
                product.getProductImages().stream().map(
                        productImage -> productImage.getImageURL()
                ).collect(Collectors.toList())
        );
        if (product.getDiscountProducts().size() > 0) {
            Date currentDate = new Date();
            for (DiscountProduct discountProduct : product.getDiscountProducts()) {
                Discount discount = discountProduct.getDiscount();
                if (currentDate.after(discount.getStartDate()) && currentDate.before(discount.getEndDate())) {
                    productDTO.setDiscountPrice(
                            discountProduct.getDiscountPrice()
                    );
                    DiscountDTO discountDTO = modelMapper.map(discount, DiscountDTO.class);
                    discountDTO.setStartDate(discount.getStartDate().toString());
                    discountDTO.setEndDate(discount.getEndDate().toString());
                    productDTO.setDiscountDTO(discountDTO);
                }
            }
        }
        return productDTO;
    }

    public List<ProductDTO> getDiscountProduct() {
        return productRepository.findProductsCurrentlyDiscount().stream()
                .map(this::applyDiscountAndConvertToDTO).collect(Collectors.toList());
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    private ItemPage<ProductDTO> paginate(int curr, long totalItems, int totalPages, List<ProductDTO> productDTOList) {
        ItemPage<ProductDTO> productDTOItemPage = new ItemPage<>();
        productDTOItemPage.setCurrentPage(curr);
        productDTOItemPage.setTotalItems(totalItems);
        productDTOItemPage.setTotalPages(totalPages);
        productDTOItemPage.setPageItems(productDTOList);

        return productDTOItemPage;
    }

}
