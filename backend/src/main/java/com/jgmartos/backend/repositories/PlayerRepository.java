package com.jgmartos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Player;

public interface PlayerRepository extends JpaRepository<Player, Integer> {

}
