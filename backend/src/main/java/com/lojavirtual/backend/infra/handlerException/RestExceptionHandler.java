package com.lojavirtual.backend.infra.handlerException;

import com.lojavirtual.backend.exceptions.NotFoundException;
import com.lojavirtual.backend.exceptions.SendEmailErrorException;
import com.lojavirtual.backend.exceptions.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    private ResponseEntity<RestErrorMessage> notFound(NotFoundException exception) {
        RestErrorMessage error = new RestErrorMessage(HttpStatus.NOT_FOUND, exception.getMessage());
        return error.toResponse();
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    private ResponseEntity<RestErrorMessage> userAlreadyExists(UserAlreadyExistsException exception) {
        RestErrorMessage error = new RestErrorMessage(HttpStatus.BAD_REQUEST, exception.getMessage());
        return error.toResponse();
    }

    @ExceptionHandler(SendEmailErrorException.class)
    private ResponseEntity<RestErrorMessage> emailError(SendEmailErrorException e) {
        RestErrorMessage error = new RestErrorMessage(HttpStatus.BAD_REQUEST, e.getMessage());
        return error.toResponse();
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<RestErrorMessage> errorException(Exception exception) {
        RestErrorMessage error = new RestErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
        return error.toResponse();
    }
}
