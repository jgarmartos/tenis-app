package com.jgmartos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Match;

public interface MatchRepository extends JpaRepository<Match, Integer> {

}
