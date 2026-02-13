package com.seva.platform.controller;

import com.seva.platform.dto.OTPRequest;
import com.seva.platform.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-otp-email")
    public ResponseEntity<?> sendOTP(@RequestBody OTPRequest request) {
        try {
            emailService.sendOTPEmail(request.getEmail(), request.getOtp(), request.getUsername());
            return ResponseEntity.ok().body("{\"success\": true}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
