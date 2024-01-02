package com.lojavirtual.backend.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException() {
        super("O usuário já existe");
    }

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
