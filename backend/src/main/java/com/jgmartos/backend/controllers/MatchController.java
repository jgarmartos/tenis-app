package com.jgmartos.backend.controllers;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.jgmartos.backend.models.statistics.MatchStatistics;
import com.jgmartos.backend.repositories.CompetitionRepository;
import com.jgmartos.backend.repositories.PlaceRepository;
import com.jgmartos.backend.repositories.PlayerRepository;
import com.jgmartos.backend.services.GameService;
import com.jgmartos.backend.services.MatchService;
import com.jgmartos.backend.services.MatchStatisticsService;
import com.jgmartos.backend.services.SetService;

import jakarta.persistence.EntityNotFoundException;

@RestController @RequestMapping("/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @Autowired
    private MatchStatisticsService matchStatisticsService;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private SetService setService;

    @Autowired
    private GameService gameService;

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
        setService.getSetsByMatch(id).forEach(set -> gameService.deleteGamesBySetId(set.getId()));
        setService.deleteSetsByMatchId(id);
        matchService.deleteMatch(id);
    }

    @GetMapping
    public List<Match> getAllMatches() {
        return matchService.getAllMatches();
    }

    @GetMapping("statistics/{matchId}")
    public MatchStatistics getMatchStatistics(@PathVariable Integer matchId) {
        return matchStatisticsService.getMatchStatistics(matchId);
    }

    @GetMapping("byplayer/{playerId}")
    public List<Match> getMatchesByPlayer(@PathVariable Integer playerId) {
        return matchService.getMatchesByPlayer(playerId);
    }

    @DeleteMapping("deleteall")
    public void deleteAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        for (Match match : matches) {
            setService.getSetsByMatch(match.getId()).forEach(set -> gameService.deleteGamesBySetId(set.getId()));
            setService.deleteSetsByMatchId(match.getId());
            matchService.deleteMatch(match.getId());
        }

    }

    @GetMapping("byplace/{placeId}")
    public ResponseEntity<List<Match>> getMatchesByPlace(@PathVariable Integer placeId) {
        try {
            List<Match> matches = matchService.getMatchesByPlace(placeId);
            return ResponseEntity.ok(matches);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().build(); // 500 Internal Server Error
        }
    }

    @PatchMapping("/{id}/place")
    public Match updateMatchPlace(@PathVariable Integer id, @RequestBody Map<String, Integer> placeRequest) {
        Integer placeId = placeRequest.get("placeId");
        return matchService.updateMatchPlace(id, placeId);
    }

}
