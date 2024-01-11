package com.lojavirtual.backend.controller;

import com.lojavirtual.backend.domain.user.*;
import com.lojavirtual.backend.exceptions.NotFoundException;
import com.lojavirtual.backend.exceptions.UserAlreadyExistsException;
import com.lojavirtual.backend.infra.security.SecurityFilter;
import com.lojavirtual.backend.infra.security.TokenService;
import com.lojavirtual.backend.repositories.UserRepository;
import com.lojavirtual.backend.services.SendEmailService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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

    @Autowired
    private SendEmailService sendEmail;

    @Autowired
    private SecurityFilter securityFilter;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
        HttpServletResponse response,
        @RequestBody AuthenticationDTO data
    ) {
        if(repo.findByLogin(data.login()) == null) {
            throw new NotFoundException("Usuário não encontrado");
        }

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        Authentication auth = authenticationManager.authenticate(usernamePassword);

        User user = (User) auth.getPrincipal();
        if(user == null) throw new NotFoundException("Usuário não encontrado");

        LoginResponseDTO resp = tokenService.generateToken(user);

        Cookie cookie = new Cookie("authToken", resp.token());
        cookie.setMaxAge(24 * 3600);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(@RequestBody RegisterDTO data) {
        if(this.repo.findByLogin(data.login()) != null) {
            throw new UserAlreadyExistsException();
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data, encryptedPassword);
        this.repo.save(newUser);

        UserDetails user = this.repo.findByLogin(newUser.getLogin());



        LoginResponseDTO response = tokenService.generateToken((User) user);

        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/password-reset")
    public ResponseEntity<Void> passwordReset(@RequestBody PasswordResetDTO data) {
        if(this.repo.findByLogin(data.email()) == null) {
            throw new NotFoundException("Usuário não encontrado");
        }

        String token = tokenService.generatePasswordResetToken(data.email());

        sendEmail.sendMail(data.email(), token);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/new-password-check")
    public ResponseEntity<Void> passwordChange(@RequestBody NewPasswordRequestDTO data) {
        String email = tokenService.validatePasswordToken(data.token());

        UserDetails user = repo.findByLogin(email);

        if(user == null) {
            throw new NotFoundException("Usuário não encontrado");
        }

        User update = (User) user;
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        update.setPassword(encryptedPassword);

        repo.save(update);

        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/state")
    public ResponseEntity<StateResponseDTO> authState(HttpServletRequest request) {
        String token = securityFilter.recoverToken(request);
        if(token == null) throw new NotFoundException("Usuário não encontrado");

        String email = tokenService.validateToken(token);
        if(email == null) throw new NotFoundException("Usuário não encontrado");

        User user = (User) repo.findByLogin(email);
        if(user == null) throw new NotFoundException("Usuário não encontrado");
        String name = user.getName();
        if(name.isEmpty()) throw new NotFoundException("Usuário não encontrado");

        return ResponseEntity.ok(new StateResponseDTO(name));
    }
}
