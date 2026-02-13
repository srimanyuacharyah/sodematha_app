package com.seva.platform.controller;

import com.seva.platform.dto.PaymentRequest;
import com.seva.platform.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/payment")
    public ResponseEntity<?> processPaymentNotification(@RequestBody PaymentRequest request) {
        try {
            emailService.sendPaymentConfirmationEmail(
                request.getEmail(), 
                request.getAmount(), 
                request.getSevaName(), 
                request.getStatus(), 
                request.getUsername()
            );
            return ResponseEntity.ok().body("{\"success\": true, \"status\": \"" + request.getStatus() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
