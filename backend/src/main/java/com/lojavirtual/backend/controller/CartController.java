package com.lojavirtual.backend.controller;

import com.lojavirtual.backend.domain.cart.Cart;
import com.lojavirtual.backend.exceptions.NotFoundException;
import com.lojavirtual.backend.infra.security.SecurityFilter;
import com.lojavirtual.backend.infra.security.TokenService;
import com.lojavirtual.backend.repositories.CartRepository;
import com.lojavirtual.backend.domain.cart.CartRequestDTO;
import com.lojavirtual.backend.domain.cart.CartResponseDTO;
import com.lojavirtual.backend.domain.product.Product;
import com.lojavirtual.backend.repositories.ProductRepository;
import jakarta.servlet.http.HttpServletRequest;
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

    @Autowired
    private TokenService tokenService;
    @Autowired
    private SecurityFilter securityFilter;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/last/{owner}")
    public ResponseEntity<CartResponseDTO> getLastCart(@PathVariable String owner) {
        Cart cart = repo.findTopByOwnerOrderByCreateAtDesc(owner);
        return ResponseEntity.ok(cart.toData());
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/id/{id}")
    public ResponseEntity<CartResponseDTO> getCartById(@PathVariable String id) {
        Cart cart = repo.findTopById(id);
        return ResponseEntity.ok(cart.toData());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/new-cart")
    public ResponseEntity<Void> registerNewCard(HttpServletRequest request, @RequestBody CartRequestDTO data) {
         String token = securityFilter.recoverToken(request);
         if(token == null) throw new NotFoundException("Usuário não encontrado");
         String email = tokenService.validateToken(token);
         if(email == null) throw new NotFoundException("Usuário não encontrado");

         List<Product> products = Arrays.stream(data.products())
             .map(prod -> prodRepo.findById(prod.id()))
             .filter(Optional::isPresent)
             .map(Optional::get)
             .collect(Collectors.toList());

         Cart cart = new Cart(data, products, email);
         repo.save(cart);
         return ResponseEntity.ok().build();
    }
}
