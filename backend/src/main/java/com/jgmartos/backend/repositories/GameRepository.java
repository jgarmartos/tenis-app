package com.jgmartos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {

}
