package com.seva.platform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOTPEmail(String to, String otp, String username) throws MessagingException {
        String displayName = username != null ? username : "Devotee";
        String subject = "Namaste " + displayName + ", Your OTP for Sode Matha App";
        
        String htmlContent = "<div style=\"font-family: 'Merriweather', serif; padding: 40px; background-color: #2D0000; border: 4px solid #D4AF37; border-radius: 20px; color: #FFFFFF; max-width: 600px; margin: auto;\">" +
                "  <div style=\"text-align: center; margin-bottom: 30px;\">" +
                "    <h1 style=\"color: #FFD700; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;\">Sri Sode Vadiraja Matha</h1>" +
                "  </div>" +
                "  <div style=\"background: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(212, 175, 55, 0.2);\">" +
                "    <p style=\"font-size: 18px; margin-bottom: 20px;\">Namaste <strong>" + displayName + "</strong>,</p>" +
                "    <p style=\"font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8);\">Your One-Time Password (OTP) for secure access to the Sode Matha App is:</p>" +
                "    <div style=\"text-align: center; margin: 40px 0;\">" +
                "      <div style=\"display: inline-block; padding: 20px 40px; background: #FFD700; color: #2D0000; font-size: 42px; font-weight: 900; border-radius: 10px; letter-spacing: 15px;\">" +
                "        " + otp +
                "      </div>" +
                "    </div>" +
                "    <p style=\"font-size: 14px; text-align: center; color: #D4AF37; margin-top: 20px;\">This code will expire in 10 minutes.</p>" +
                "  </div>" +
                "</div>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom("Sode Matha App <srimanyuacharya@gmail.com>");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

    public void sendPaymentConfirmationEmail(String to, String amount, String sevaName, String status, String username) throws MessagingException {
        boolean isSuccess = "success".equalsIgnoreCase(status);
        String displayName = username != null ? username : "Devotee";
        String subject = isSuccess ? "Payment Successful - Sri Sode Vadiraja Matha" : "Payment Failed - Sri Sode Vadiraja Matha";
        
        String htmlContent = "<div style=\"font-family: 'Merriweather', serif; padding: 40px; background-color: " + (isSuccess ? "#002D00" : "#2D0000") + "; border: 4px solid #D4AF37; border-radius: 20px; color: #FFFFFF; max-width: 600px; margin: auto;\">" +
                "    <div style=\"text-align: center; margin-bottom: 30px;\">" +
                "        <h1 style=\"color: #FFD700; margin: 0; font-size: 28px; text-transform: uppercase;\">Payment " + (isSuccess ? "Successful" : "Failed") + "</h1>" +
                "    </div>" +
                "    <div style=\"background: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(212, 175, 55, 0.2);\">" +
                "        <p>Namaste " + displayName + ",</p>" +
                "        <p>Your payment of <strong>₹" + amount + "</strong> for <strong>" + sevaName + "</strong> has been " + (isSuccess ? "completed successfully" : "unsuccessful") + ".</p>" +
                "        <p style=\"margin-top: 20px;\">Transaction Details:</p>" +
                "        <ul>" +
                "            <li>Amount: ₹" + amount + "</li>" +
                "            <li>Seva: " + sevaName + "</li>" +
                "            <li>Status: " + (isSuccess ? "SUCCESS" : "FAILURE") + "</li>" +
                "        </ul>" +
                "    </div>" +
                "</div>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom("Sode Matha App <srimanyuacharya@gmail.com>");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}
