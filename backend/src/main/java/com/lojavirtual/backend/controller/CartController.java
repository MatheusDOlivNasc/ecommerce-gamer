package com.lojavirtual.backend.controller;

import com.lojavirtual.backend.domain.cart.Cart;
import com.lojavirtual.backend.domain.cart.CartRepository;
import com.lojavirtual.backend.domain.cart.CartRequestDTO;
import com.lojavirtual.backend.domain.cart.CartResponseDTO;
import com.lojavirtual.backend.domain.product.Product;
import com.lojavirtual.backend.domain.product.ProductRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    CartRepository repo;
    @Autowired
    ProductRepository prodRepo;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/last/{owner}")
    public ResponseEntity<CartResponseDTO> getLastCart(@PathVariable String owner) {
        Cart cart = repo.findTopByOwnerOrderByCreateAtDesc(owner);
        return ResponseEntity.ok(cart.toData());
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/byId/{id}")
    public ResponseEntity<CartResponseDTO> getCartById(@PathVariable String id) {
        Cart cart = repo.findTopById(id);
        return ResponseEntity.ok(cart.toData());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Void> registerNewCard(@RequestBody CartRequestDTO data) {
         List<Product> products = Arrays.stream(data.products())
             .map(prod -> prodRepo.findById(prod.id()))
             .filter(Optional::isPresent)
             .map(Optional::get)
             .collect(Collectors.toList());

        Cart cart = new Cart(data, products);
        repo.save(cart);
        return ResponseEntity.ok().build();
    }
}
