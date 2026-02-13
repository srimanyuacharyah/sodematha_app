package com.seva.platform.dto;

public class OTPRequest {
    private String email;
    private String otp;
    private String username;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
