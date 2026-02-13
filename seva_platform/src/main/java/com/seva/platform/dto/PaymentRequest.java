package com.seva.platform.dto;

public class PaymentRequest {
    private String email;
    private String amount;
    private String sevaName;
    private String status;
    private String username;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public String getSevaName() { return sevaName; }
    public void setSevaName(String sevaName) { this.sevaName = sevaName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
