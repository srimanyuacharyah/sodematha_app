package com.seva.platform.service;

import com.seva.platform.model.Seva;
import com.seva.platform.repository.SevaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.List;

@Service
public class SevaService {

    @Autowired
    private SevaRepository sevaRepository;

    @PostConstruct
    public void init() {
        if (sevaRepository.count() == 0) {
            sevaRepository.save(new Seva("One Day Sampurna Seva", "Complete seva for one full day including Annadana.",
                    new BigDecimal("5001")));
            sevaRepository.save(
                    new Seva("Maha Sarvaseva", "Special pooja and offering to the deity.", new BigDecimal("1500")));
            sevaRepository.save(new Seva("Nanda Deepa (One Year)",
                    "Lighting of the eternal lamp for one full year in your name.", new BigDecimal("1200")));
            sevaRepository
                    .save(new Seva("Alankara Pooja", "Decoration of the deity with flowers.", new BigDecimal("501")));
            sevaRepository.save(
                    new Seva("Panchamrutha Abhisheka", "Abhisheka with five sacred liquids.", new BigDecimal("1001")));
            sevaRepository
                    .save(new Seva("General Kanike", "General contribution to the Matha.", new BigDecimal("100")));
        }
    }

    public List<Seva> getAllSevas() {
        return sevaRepository.findAll();
    }
}
