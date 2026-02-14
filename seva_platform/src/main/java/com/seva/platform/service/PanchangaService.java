package com.seva.platform.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class PanchangaService {

    // A more refined (but still deterministic) implementation for the demo year
    // 2026.
    // Centered around Feb 14, 2026 (Epoch 20498) which is Dwadashi, Magha Masa.

    public Map<String, String> getPanchangaForDate(LocalDate date) {
        Map<String, String> data = new HashMap<>();
        long day = date.toEpochDay();

        // Reference point: Feb 14, 2026 (Saturday) - Epoch 20498
        // On this day in Udupi/Madhwa tradition:
        // Tithi: Dwadashi (12th Tithi of the month cycle)
        // Nakshatra: Purva Ashadha (20th Nakshatra)
        // Masa: Magha
        // Paksha: Shukla
        long refDay = 20498;
        long diff = day - refDay;

        // Hindu Month consists of 30 Tithis (15 Shukla + 15 Krishna)
        String[] tithis = {
                "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami",
                "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Pournami",
                "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami",
                "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
        };

        String[] nakshatras = {
                "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
                "Magha",
                "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
                "Mula",
                "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
                "Uttara Bhadrapada", "Revati"
        };

        String[] masas = { "Magha", "Phalguna", "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
                "Ashwayuja", "Kartika", "Margashira", "Pushya" };
        String[] rutus = { "Shishira", "Vasanta", "Grishma", "Varsha", "Sharad", "Hemanta" };

        // Calculate Indices with correct wrap-around
        // Feb 14 is Dwadashi (Index 11 in 0-29 cycle)
        int tithiIdx = (int) ((11 + diff) % 30);
        if (tithiIdx < 0)
            tithiIdx += 30;

        // Feb 14 is Purva Ashadha (Index 19 in 0-26 cycle)
        int nakshatraIdx = (int) ((19 + diff) % 27);
        if (nakshatraIdx < 0)
            nakshatraIdx += 27;

        // Masa changes roughly every 30 days. Magha at refDay diff=0.
        int masaIdx = (int) (((diff + 15) / 30) % 12);
        if (masaIdx < 0)
            masaIdx += 12;

        int rutuIdx = (int) (((diff + 15) / 60) % 6);
        if (rutuIdx < 0)
            rutuIdx += 6;

        data.put("date", date.toString());
        data.put("samvatsara", "Krodhi");
        data.put("rutu", rutus[rutuIdx]);
        data.put("masa", masas[masaIdx]);
        data.put("paksha", (tithiIdx < 15) ? "Shukla" : "Krishna");
        data.put("titi", tithis[tithiIdx]);
        data.put("nakshatra", nakshatras[nakshatraIdx]);
        data.put("yoga", (day % 2 == 0) ? "Siddhi" : "Vyatipata");
        data.put("karana", (day % 2 == 0) ? "Taitila" : "Garaja");

        // Specific Occasions based on researched dates
        if (day == refDay) {
            data.put("occasion", "Dwadashi Vrata");
        } else if (day == refDay - 2) {
            data.put("occasion", "Vijaya Ekadashi");
        } else if (day == 20511) { // Feb 27
            data.put("occasion", "Amalaki Ekadashi");
        } else if (day == 20512) { // Feb 28
            data.put("occasion", "Maha Shivaratri");
        } else {
            data.put("occasion", "Regular Day");
        }

        return data;
    }
}
