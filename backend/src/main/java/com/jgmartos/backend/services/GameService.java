package com.jgmartos.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Game;
import com.jgmartos.backend.repositories.GameRepository;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public Game getGame(Integer id) {
        return gameRepository.findById(id).orElse(null);
    }

    public Game updateGame(Game game) {
        return gameRepository.save(game);
    }

    public void deleteGame(Integer id) {
        gameRepository.deleteById(id);
    }
    
    //get all games
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public List<Game> getGamesBySet(Integer setId) {
        List<Game> sortedGames = gameRepository.findBySetId(setId);
        sortedGames.sort((g1, g2) -> g1.getGameNumber() - g2.getGameNumber());
        return sortedGames;
    }


}
