package com.jgmartos.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {

    public List<Game> findBySetId(Integer setId);

    public void deleteBySetId(Integer setId);
}
