package com.lojavirtual.backend.services;

import com.lojavirtual.backend.exceptions.SendEmailErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {
    @Autowired
    private JavaMailSender emailSender;

    public void sendMail(String email, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("matheus.o.nascimento@outlook.com");
            message.setTo(email);
            message.setSubject("Redefina sua senha - ACOMP Eletronicos");
            message.setText("Acesse o link para redefinir: http://localhost:5137/auth/reset-password/" + token);
            emailSender.send(message);
        } catch (MailException e) {
            throw new SendEmailErrorException();
        }
    }
}
