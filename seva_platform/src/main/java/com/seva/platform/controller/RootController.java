package com.seva.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, String> index() {
        return Map.of(
            "status", "UP",
            "message", "Sri Sode Vadiraja Matha - Seva Platform Backend is running.",
            "api_base", "/api",
            "h2_console", "/h2-console"
        );
    }
}
