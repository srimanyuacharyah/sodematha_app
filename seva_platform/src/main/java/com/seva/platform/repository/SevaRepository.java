package com.seva.platform.repository;

import com.seva.platform.model.Seva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SevaRepository extends JpaRepository<Seva, Long> {
}
