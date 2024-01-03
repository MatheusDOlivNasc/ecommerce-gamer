package com.lojavirtual.backend.domain.user;

import lombok.NonNull;

public record PasswordResetDTO(
        @NonNull String email
) {}
