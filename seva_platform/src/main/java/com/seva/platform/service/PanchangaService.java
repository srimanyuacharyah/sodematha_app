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

        // Reference point: Jan 25, 2026 (Sunday) - Epoch 20478
        // This is Ratha Saptami: Magha Masa, Shukla Paksha, Saptami Tithi.
        // Nakshatra on this day: Ashwini (approx reference for calculation)
        // Note: For a real demo, we anchor to known major dates.
        long refDay = 20478; 
        long diff = day - refDay;

        String[] tithis = {
                "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami",
                "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Pournami",
                "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami",
                "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
        };

        String[] nakshatras = {
                "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
                "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
                "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
                "Uttara Bhadrapada", "Revati"
        };

        String[] masas = { "Magha", "Phalguna", "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
                "Ashwayuja", "Kartika", "Margashira", "Pushya" };
        String[] rutus = { "Shishira", "Vasanta", "Grishma", "Varsha", "Sharad", "Hemanta" };

        // Tithi calculation: Jan 25 is Saptami (Index 6)
        int tithiIdx = (int) ((6 + diff) % 30);
        if (tithiIdx < 0) tithiIdx += 30;

        // Nakshatra calculation: Jan 25 is Revati (Index 26) 
        // Diff between Jan 25 and Feb 14 is 20 days. 
        // Feb 14 would be (26 + 20) % 27 = 46 % 27 = 19 (Purva Ashadha). Correct!
        int nakshatraIdx = (int) ((26 + diff) % 27);
        if (nakshatraIdx < 0) nakshatraIdx += 27;

        // Masa changes every ~29.5 days. Jan 25 is Magha.
        // We'll use a simpler 30-day shift for demo purposes.
        int masaIdx = (int) (((diff + 10) / 30) % 12); // Offset to keep Jan 25 in Magha
        if (masaIdx < 0) masaIdx += 12;

        int rutuIdx = (int) (((diff + 40) / 60) % 6); // Shishira starts before Jan 25
        if (rutuIdx < 0) rutuIdx += 6;

        data.put("date", date.toString());
        data.put("samvatsara", "Krodhi");
        data.put("rutu", rutus[rutuIdx]);
        data.put("masa", masas[masaIdx]);
        data.put("paksha", (tithiIdx < 15) ? "Shukla" : "Krishna");
        data.put("titi", tithis[tithiIdx]);
        data.put("nakshatra", nakshatras[nakshatraIdx]);
        data.put("yoga", (day % 2 == 0) ? "Siddhi" : "Vyatipata");
        data.put("karana", (day % 2 == 0) ? "Bava" : "Balava");

        // Specific Occasions
        if (day == 20478) {
            data.put("occasion", "Ratha Saptami");
        } else if (day == 20498) {
            data.put("occasion", "Dwadashi Vrata");
        } else if (day == 20496) {
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
