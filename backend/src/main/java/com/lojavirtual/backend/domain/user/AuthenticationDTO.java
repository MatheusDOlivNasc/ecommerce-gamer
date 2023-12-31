package com.lojavirtual.backend.domain.user;

import lombok.NonNull;

public record AuthenticationDTO(
    @NonNull String login,
    @NonNull String password
) {}
