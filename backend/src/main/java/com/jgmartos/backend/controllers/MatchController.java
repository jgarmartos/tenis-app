package com.jgmartos.backend.controllers;

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

import com.jgmartos.backend.models.Match;
import com.jgmartos.backend.services.MatchService;

@RestController
@RequestMapping("/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @PostMapping
    public Match createMatch(Match match) {
        return matchService.createMatch(match);
    }

    @GetMapping("/{id}")
    public Match getMatch(@PathVariable Integer id) {
        return matchService.getMatch(id);
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
