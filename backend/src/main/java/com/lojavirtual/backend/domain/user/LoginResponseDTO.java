package com.lojavirtual.backend.domain.user;

import lombok.NonNull;

public record LoginResponseDTO(
        @NonNull String token,
        @NonNull String name,
        @NonNull Long validity
) {}
