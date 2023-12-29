package com.lojavirtual.backend.domain.product;

public record ProductResponseDTO(String id, String name, String img, Integer price, Integer promo) {
    public ProductResponseDTO(Product p) {
        this(p.getId(), p.getName(), p.getImg(), p.getPrice(), p.getPromo());
    }
}
