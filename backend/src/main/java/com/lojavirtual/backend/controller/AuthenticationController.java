package com.lojavirtual.backend.controller;

import com.lojavirtual.backend.domain.user.AuthenticationDTO;
import com.lojavirtual.backend.domain.user.LoginResponseDTO;
import com.lojavirtual.backend.domain.user.RegisterDTO;
import com.lojavirtual.backend.domain.user.User;
import com.lojavirtual.backend.infra.security.TokenService;
import com.lojavirtual.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repo;

    @Autowired
    private TokenService tokenService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);

        String token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO((token)));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterDTO data) {
        if(this.repo.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data, encryptedPassword);

        this.repo.save(newUser);

        return ResponseEntity.ok().build();
    }
}
