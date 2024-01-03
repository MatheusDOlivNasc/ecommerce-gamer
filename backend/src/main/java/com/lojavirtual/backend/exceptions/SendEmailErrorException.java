package com.lojavirtual.backend.exceptions;

public class SendEmailErrorException extends RuntimeException {
    public SendEmailErrorException() {
        super("Erro ao enviar e-mail");
    }
    public SendEmailErrorException(String message) {
        super(message);
    }
}
