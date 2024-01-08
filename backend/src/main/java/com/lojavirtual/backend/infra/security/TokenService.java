package com.lojavirtual.backend.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.lojavirtual.backend.domain.user.LoginResponseDTO;
import com.lojavirtual.backend.domain.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;
    @Value("${api.security.token.passwordResetSecret}")
    private String passwordResetSecret;

    public LoginResponseDTO generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            Instant expiresAt = genExpirationDate(24);
            String token = JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(user.getLogin())
                    .withExpiresAt(expiresAt)
                    .sign(algorithm);

            return new LoginResponseDTO(token, user.getName(), expiresAt.toEpochMilli());
        } catch (JWTCreationException exception) {
            throw new RuntimeException("error while generating token", exception);
        }
    }

    public String generatePasswordResetToken(String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(passwordResetSecret);

            return JWT.create()
                    .withIssuer("reset-password")
                    .withSubject(email)
                    .withIssuedAt(genExpirationDate(0))
                    .withExpiresAt(genExpirationDate(1))
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("error while generating password reset token", exception);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    public String validatePasswordToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.require(algorithm)
                    .withIssuer("reset-password")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    private Instant genExpirationDate(Integer n) {
        return LocalDateTime.now().plusHours(n).toInstant(ZoneOffset.of("-03:00"));
    }
}
