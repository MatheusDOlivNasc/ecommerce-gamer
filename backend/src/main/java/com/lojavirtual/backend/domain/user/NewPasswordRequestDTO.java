package com.lojavirtual.backend.domain.user;

import lombok.NonNull;

public record NewPasswordRequestDTO(
        @NonNull String token,
        @NonNull String password
) {}
