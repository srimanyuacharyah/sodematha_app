package com.seva.platform.controller;

import com.seva.platform.service.SMSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SMSController {

    @Autowired
    private SMSService smsService;

    @PostMapping("/send-sms")
    public ResponseEntity<?> sendSMS(@RequestBody Map<String, String> request) {
        String to = request.get("to");
        String message = request.get("message");

        if (to == null || message == null) {
            return ResponseEntity.badRequest().body("{\"error\": \"Missing parameters\"}");
        }

        try {
            String sid = smsService.sendSMS(to, message);
            return ResponseEntity.ok().body("{\"success\": true, \"sid\": \"" + sid + "\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
