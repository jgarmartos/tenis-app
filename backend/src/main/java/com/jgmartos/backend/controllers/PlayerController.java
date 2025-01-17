package com.jgmartos.backend.controllers;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.Player;
import com.jgmartos.backend.models.PlayerResponse;
import com.jgmartos.backend.models.statistics.PlayerStatistics;
import com.jgmartos.backend.services.PlayerService;
import com.jgmartos.backend.services.PlayerStatisticsService;

@RestController
@RequestMapping("/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlayerStatisticsService playerStatisticsService;

    @PostMapping
    public Player createPlayer(Player player) {
        return playerService.createPlayer(player);
    }

    @GetMapping("/{id}")
    public PlayerResponse getPlayer(@PathVariable Integer id) {
        PlayerResponse playerResponse = new PlayerResponse();
        Player player = playerService.getPlayer(id);
        PlayerStatistics playerStatistics = playerStatisticsService.getPlayerStatistics(id);
        playerResponse.setId(player.getId());
        playerResponse.setName(player.getName());
        playerResponse.setForehand(player.getForehand());
        playerResponse.setAvatar(player.getAvatar());
        playerResponse.setPlayerStatistics(playerStatistics);
        
        return playerResponse;
    }

    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable Integer id, @RequestBody Player player) {
        player.setId(id);
        return playerService.updatePlayer(player);
    }

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Integer id) {
        playerService.deletePlayer(id);
    }

    @GetMapping
    public List<PlayerResponse> getAllPlayers() {
        List<Player> players = playerService.getAllPlayers();
        List<PlayerResponse> playerResponses = new ArrayList<>();

        for (Player player : players) {
            PlayerStatistics playerStatistics = playerStatisticsService.getPlayerStatistics(player.getId());
            PlayerResponse playerResponse = new PlayerResponse();
            playerResponse.setId(player.getId());
            playerResponse.setName(player.getName());
            playerResponse.setForehand(player.getForehand());
            playerResponse.setAvatar(player.getAvatar());
            playerResponse.setPlayerStatistics(playerStatistics);
            playerResponses.add(playerResponse);
        }
        return playerResponses;
    }

    @GetMapping("/statistics/{id}")
    public PlayerStatistics getPlayerStatistics(@PathVariable Integer id) {
        return playerStatisticsService.getPlayerStatistics(id);
    }

}
