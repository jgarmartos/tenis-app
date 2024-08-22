package com.jgmartos.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.Game;
import com.jgmartos.backend.models.requests.GameRequest;
import com.jgmartos.backend.repositories.SetRepository;
import com.jgmartos.backend.services.GameService;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private SetRepository setRepository;

    @PostMapping
    public Game createGame(@RequestBody GameRequest request) {
        Game game = new Game();

        game.setSet(setRepository.findById(request.getSet()).orElse(null));
        game.setPlayer1Points(request.getPlayer1Points());
        game.setPlayer2Points(request.getPlayer2Points());
        game.setPlayer1Score(request.getPlayer1Score()+"");
        game.setPlayer2Score(request.getPlayer2Score()+"");
        game.setType(request.getType());
        game.setGameNumber(request.getGameNumber());
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
