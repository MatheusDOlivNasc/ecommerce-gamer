package com.lojavirtual.backend.controller;

import com.lojavirtual.backend.domain.product.Product;
import com.lojavirtual.backend.repositories.ProductRepository;
import com.lojavirtual.backend.domain.product.ProductRequestDTO;
import com.lojavirtual.backend.domain.product.ProductResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductRepository repo;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAll() {
        List<ProductResponseDTO> data = repo.findAll().stream().map(ProductResponseDTO::new).toList();
        return ResponseEntity.ok(data);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Void> registerProduct(@RequestBody ProductRequestDTO data) {
        Product p = new Product(data);
        repo.save(p);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping
    public ResponseEntity<ProductRequestDTO> updateProduct(@RequestBody ProductRequestDTO data) {
        Optional<Product> update = repo.findById(data.id());

        if(update.isPresent()) {
            Product product =  update.get();
            product.update(data);
            repo.save(product);
            return ResponseEntity.ok(data);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
