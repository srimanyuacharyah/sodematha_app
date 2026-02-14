package com.seva.platform.controller;

import com.seva.platform.model.Booking;
import com.seva.platform.model.Seva;
import com.seva.platform.service.BookingService;
import com.seva.platform.service.SevaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private SevaService sevaService;

    @GetMapping("/sevas")
    public List<Seva> getAllSevas() {
        return sevaService.getAllSevas();
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("email");
        Long sevaId = Long.valueOf(payload.get("sevaId").toString());
        String transactionId = (String) payload.get("transactionId");

        Booking booking = bookingService.createBooking(email, sevaId, transactionId);
        return ResponseEntity.ok(booking);
    }

    @GetMapping
    public List<Booking> getMyBookings(@RequestParam String email) {
        return bookingService.getBookingsByEmail(email);
    }

    @PostMapping("/{id}/refund")
    public ResponseEntity<?> requestRefund(@PathVariable Long id) {
        try {
            Booking booking = bookingService.requestRefund(id);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
