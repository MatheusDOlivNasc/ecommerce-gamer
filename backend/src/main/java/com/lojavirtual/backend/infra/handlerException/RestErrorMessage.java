package com.lojavirtual.backend.infra.handlerException;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@AllArgsConstructor
@Getter
@Setter
public class RestErrorMessage {
    private HttpStatus status;
    private String message;

    public ResponseEntity<RestErrorMessage> toResponse() {
        return ResponseEntity.status(this.getStatus()).body(this);
    }
}
