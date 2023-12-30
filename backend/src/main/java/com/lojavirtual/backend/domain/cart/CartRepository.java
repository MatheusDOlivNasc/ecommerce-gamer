package com.lojavirtual.backend.domain.cart;

import com.lojavirtual.backend.domain.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findTopByOwnerOrderByCreateAtDesc(String owner);
    Cart findTopById(String id);
}
