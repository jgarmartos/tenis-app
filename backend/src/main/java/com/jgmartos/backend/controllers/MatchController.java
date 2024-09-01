package com.jgmartos.backend.controllers;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.Match;
import com.jgmartos.backend.models.requests.MatchRequest;
import com.jgmartos.backend.repositories.CompetitionRepository;
import com.jgmartos.backend.repositories.PlaceRepository;
import com.jgmartos.backend.repositories.PlayerRepository;
import com.jgmartos.backend.services.MatchService;

@RestController
@RequestMapping("/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private CompetitionRepository competitionRepository;

    @PostMapping
    public Match createMatch(@RequestBody MatchRequest matchRequest) {
        Match match = new Match();

        match.setPlayer1(playerRepository.findById(matchRequest.getPlayer1()).orElse(null));
        match.setPlayer2(playerRepository.findById(matchRequest.getPlayer2()).orElse(null));
        match.setCompetition(competitionRepository.findById(matchRequest.getCompetition()).orElse(null));
        match.setPlace(placeRepository.findById(matchRequest.getPlace()).orElse(null));
        match.setDate(matchRequest.getDate());
        Date date = new Date(matchRequest.getStartTime());
        match.setStartTime(new java.sql.Time(date.getTime()));
        match.setEndTime(null);
        match.setSurface(matchRequest.getSurface());
        match.setWinner(playerRepository.findById(matchRequest.getWinnerId()).orElse(null));

        return matchService.createMatch(match);
    }

    @GetMapping("/{id}")
    public Match getMatch(@PathVariable Integer id) {
        return matchService.getMatch(id);
    }

    // @PutMapping("/{id}/{winnerId}")
    // public Match updateWinner(@PathVariable Integer id, @PathVariable Integer
    // winnerId) {
    // return matchService.updateWinner(id, winnerId);
    // }

    @PatchMapping("/{id}/winner")
    public Match updateWinner(@PathVariable Integer id, @RequestBody Map<String, Integer> winnerRequest) {
        Integer winnerId = winnerRequest.get("winnerId");
        return matchService.updateWinner(id, winnerId);
    }

    @PutMapping("/{id}")                        
    public Match updateMatch(@PathVariable Integer id, @RequestBody Match match) {
        match.setId(id);
        return matchService.updateMatch(match);
    }

    @DeleteMapping("/{id}")
    public void deleteMatch(@PathVariable Integer id) {
        matchService.deleteMatch(id);
    }

    @GetMapping
    public List<Match> getAllMatches() {
        return matchService.getAllMatches();
    }

}
