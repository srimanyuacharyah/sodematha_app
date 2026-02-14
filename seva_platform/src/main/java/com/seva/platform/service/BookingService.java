package com.seva.platform.service;

import com.seva.platform.model.Booking;
import com.seva.platform.model.Seva;
import com.seva.platform.repository.BookingRepository;
import com.seva.platform.repository.SevaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SevaRepository sevaRepository;

    public Booking createBooking(String email, Long sevaId, String transactionId) {
        Seva seva = sevaRepository.findById(sevaId)
                .orElseThrow(() -> new RuntimeException("Seva not found"));

        Booking booking = new Booking();
        booking.setUserEmail(email);
        booking.setSeva(seva);
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("BOOKED");
        booking.setTransactionId(transactionId);

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByUserEmail(email);
    }

    public Booking requestRefund(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!"BOOKED".equals(booking.getStatus())) {
            throw new RuntimeException("Refund only possible for BOOKED status");
        }

        booking.setStatus("REFUND_PENDING");
        return bookingRepository.save(booking);
    }
}
