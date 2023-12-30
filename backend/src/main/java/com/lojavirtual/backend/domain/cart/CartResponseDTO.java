package com.lojavirtual.backend.domain.cart;

import com.lojavirtual.backend.domain.product.Product;

import java.util.List;

public record CartResponseDTO(
    String id,
    String owner,
    long createAt,
    List<Product> products
) {
    public CartResponseDTO(Cart c) {
        this(c.getId(), c.getOwner(), c.getCreateAt().getTime(), c.getProducts());
    }
}
