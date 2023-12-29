package com.lojavirtual.backend.controller;

import com.lojavirtual.backend.domain.product.Product;
import com.lojavirtual.backend.domain.product.ProductRepository;
import com.lojavirtual.backend.domain.product.ProductRequestDTO;
import com.lojavirtual.backend.domain.product.ProductResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductRepository repo;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity getAll() {
        List<ProductResponseDTO> data = repo.findAll().stream().map(ProductResponseDTO::new).toList();
        return ResponseEntity.ok(data);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity registerProduct(@RequestBody ProductRequestDTO data) {
        Product p = new Product(data);
        repo.save(p);
        return ResponseEntity.ok().build();
    }
}
