package com.seva.platform.controller;

import com.seva.platform.service.PanchangaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/panchanga")
@CrossOrigin(origins = "*")
public class PanchangaController {

    @Autowired
    private PanchangaService panchangaService;

    @GetMapping("/today")
    public Map<String, String> getTodayPanchanga() {
        return panchangaService.getPanchangaForDate(LocalDate.now());
    }

    @GetMapping
    public Map<String, String> getPanchangaForDate(@RequestParam String date) {
        return panchangaService.getPanchangaForDate(LocalDate.parse(date));
    }
}
