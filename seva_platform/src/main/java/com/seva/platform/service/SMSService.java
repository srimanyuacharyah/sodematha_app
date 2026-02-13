package com.seva.platform.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class SMSService {

    @Value("${spring.twilio.account-sid}")
    private String accountSid;

    @Value("${spring.twilio.auth-token}")
    private String authToken;

    @Value("${spring.twilio.phone-number}")
    private String fromPhoneNumber;

    @PostConstruct
    public void init() {
        if (accountSid != null && !accountSid.isEmpty() && authToken != null && !authToken.isEmpty()) {
            Twilio.init(accountSid, authToken);
        }
    }

    public String sendSMS(String to, String message) {
        if (accountSid == null || accountSid.isEmpty() || fromPhoneNumber == null || fromPhoneNumber.isEmpty()) {
            System.out.println("[REAL SMS MOCK] To: " + to + " | Msg: " + message);
            return "MOCKED_SID";
        }

        String formattedTo = to.startsWith("+") ? to : "+91" + to;
        Message twilioMessage = Message.creator(
                new PhoneNumber(formattedTo),
                new PhoneNumber(fromPhoneNumber),
                message
        ).create();

        return twilioMessage.getSid();
    }
}
