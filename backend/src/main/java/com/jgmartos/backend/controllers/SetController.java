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

import com.jgmartos.backend.models.Set;
import com.jgmartos.backend.models.requests.SetRequest;
import com.jgmartos.backend.repositories.MatchRepository;
import com.jgmartos.backend.repositories.PlayerRepository;
import com.jgmartos.backend.services.SetService;

@RestController
@RequestMapping("/sets")
public class SetController {

    @Autowired 
    private SetService setService;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;


    @PostMapping
    public Set createSet(@RequestBody SetRequest setRequest) {
        Set set = new Set();

        set.setMatch(matchRepository.findById(setRequest.getMatchId()).orElse(null));
        set.setNumberSet(setRequest.getNumberSet());
        set.setPlayer1Score(setRequest.getScorePlayer1());
        set.setPlayer2Score(setRequest.getScorePlayer2());
        set.setType(setRequest.getType());
        set.setWinner(playerRepository.findById(setRequest.getWinner()).orElse(null));
        
        return setService.createSet(set);
    }

    @GetMapping("/{id}")
    public Set getSet(@PathVariable Integer id) {
        return setService.getSet(id);
    }

    @PutMapping("/{id}")
    public Set updateSet(Set set) {
        return setService.updateSet(set);
    }

    @DeleteMapping("/{id}")
    public void deleteSet(@PathVariable Integer id) {
        setService.deleteSet(id);
    }

    @GetMapping
    public List<Set> getAllSets() {
        return setService.getAllSets();
    }

    @GetMapping("/match/{id}")
    public List<Set> getSetsByMatch(@PathVariable Integer id) {
        return setService.getSetsByMatch(id);
    }

}
