package com.lojavirtual.backend.domain.cart;

import com.lojavirtual.backend.domain.product.Product;
import com.lojavirtual.backend.domain.product.ProductRequestDTO;

import java.util.Set;

public record CartRequestDTO(
    String owner,
    long createAt,
    ProductRequestDTO[] products
) {}
