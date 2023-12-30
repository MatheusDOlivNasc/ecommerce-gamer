package com.lojavirtual.backend.domain.product;

import lombok.NonNull;

public record ProductRequestDTO(
        String id,
        @NonNull String name,
        String img,
        @NonNull Integer price,
        Integer promo
) {}
