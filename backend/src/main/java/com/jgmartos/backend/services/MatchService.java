package com.jgmartos.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Match;
import com.jgmartos.backend.repositories.MatchRepository;
import com.jgmartos.backend.repositories.PlayerRepository;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public Match getMatch(Integer id) {
        return matchRepository.findById(id).orElse(null);
    }

    public Match updateMatch(Match match) {
        return matchRepository.save(match);
    }

    public Match updateWinner(Integer id, Integer winnerId) {
        Match match = matchRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Match not found"));
        match.setWinner(playerRepository.findById(winnerId).orElse(null));
        return matchRepository.save(match);
    }

    public void deleteMatch(Integer id) {
        matchRepository.deleteById(id);
    }

    //get all matches
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

}
