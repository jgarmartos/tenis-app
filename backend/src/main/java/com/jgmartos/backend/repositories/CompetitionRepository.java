package com.jgmartos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Competition;

public interface CompetitionRepository extends JpaRepository<Competition, Integer> {

}
