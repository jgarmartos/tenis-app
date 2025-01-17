package com.jgmartos.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Match;

public interface MatchRepository extends JpaRepository<Match, Integer> {

    public List<Match> findByPlayer1IdOrPlayer2Id(Integer player1, Integer player2);

}
