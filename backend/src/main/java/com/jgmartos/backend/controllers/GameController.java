package com.jgmartos.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.Game;
import com.jgmartos.backend.services.GameService;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping
    public Game createGame(Game game) {
        return gameService.createGame(game);
    }

    @GetMapping("/{id}")
    public Game getGame(Integer id) {
        return gameService.getGame(id);
    }

    @PutMapping("/{id}")
    public Game updateGame(Game game) {
        return gameService.updateGame(game);
    }

    @DeleteMapping("/{id}")
    public void deleteGame(Integer id) {
        gameService.deleteGame(id);;
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }


}
