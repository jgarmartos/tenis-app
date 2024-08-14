package com.jgmartos.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.MatchSet;
import com.jgmartos.backend.services.MatchSetService;

@RestController
@RequestMapping("/matchsets")
public class MatchSetController {

    @Autowired
    private MatchSetService matchSetService;

    @PostMapping
    public MatchSet createMatchSet(MatchSet matchSet) {
        return matchSetService.createMatchSet(matchSet);
    }

    @GetMapping("/{id}")
    public MatchSet getMatchSet(Integer id) {
        return matchSetService.getMatchSet(id);
    }

    @PutMapping("/{id}")
    public MatchSet updateMatchSet(MatchSet matchSet) {
        return matchSetService.updateMatchSet(matchSet);
    }

    @DeleteMapping("/{id}")
    public void deleteMatchSet(Integer id) {
        matchSetService.deleteMatchSet(id);
    }

    @GetMapping
    public List<MatchSet> getAllMatchSets() {
        return matchSetService.getAllMatchSets();
    }

}
