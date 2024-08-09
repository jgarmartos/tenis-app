package com.jgmartos.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Player;
import com.jgmartos.backend.repositories.PlayerRepository;

@Service
public class PlayerService {

    //create a CRUD service
    @Autowired
    private PlayerRepository playerRepository;

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player getPlayer(Integer id) {
        return playerRepository.findById(id).orElse(null);
    }

    public Player updatePlayer(Player player) {
        return playerRepository.save(player);
    }

    public void deletePlayer(Integer id) {
        playerRepository.deleteById(id);
    }

    //get all player
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }


}
