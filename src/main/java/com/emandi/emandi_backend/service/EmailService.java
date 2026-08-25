package com.emandi.emandi_backend.service;


import com.emandi.emandi_backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Welcome to AgriChain - Registration Successful");
        message.setText(String.format(
                "Dear %s,\n\n" +
                        "Welcome to AgriChain! Your registration as a %s has been successful.\n\n" +
                        "Your application is now under review. You will receive updates via SMS and email.\n\n" +
                        "Thank you for joining AgriChain!\n\n" +
                        "Best regards,\n" +
                        "AgriChain Team",
                user.getFullName(), user.getUserType().toString().toLowerCase()
        ));

        mailSender.send(message);
    }

    public void sendKycStatusEmail(User user, boolean approved, String documentType) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("KYC " + documentType + " Verification Update");

        String status = approved ? "approved" : "rejected";
        message.setText(String.format(
                "Dear %s,\n\n" +
                        "Your %s document verification has been %s.\n\n" +
                        "Please log in to your account to check the current status.\n\n" +
                        "Best regards,\n" +
                        "AgriChain Team",
                user.getFullName(), documentType, status
        ));

        mailSender.send(message);
    }
}
