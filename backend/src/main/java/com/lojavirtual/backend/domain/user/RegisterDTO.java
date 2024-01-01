package com.lojavirtual.backend.domain.user;

import lombok.NonNull;

public record RegisterDTO(
    @NonNull String login,
    @NonNull String password,
    @NonNull String name,
    UserRole role
) {}
