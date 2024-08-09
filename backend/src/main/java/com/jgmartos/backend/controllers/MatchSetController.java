package com.jgmartos.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.MatchSet;
import com.jgmartos.backend.repositories.MatchSetRepository;

@RestController
@RequestMapping("/matchsets")
public class MatchSetController {

    @Autowired
    private MatchSetRepository matchSetRepository;

    public MatchSet createMatchSet(MatchSet matchSet) {
        return matchSetRepository.save(matchSet);
    }

    public MatchSet getMatchSet(Integer id) {
        return matchSetRepository.findById(id).orElse(null);
    }

    public MatchSet updateMatchSet(MatchSet matchSet) {
        return matchSetRepository.save(matchSet);
    }

    public void deleteMatchSet(Integer id) {
        matchSetRepository.deleteById(id);
    }

    public List<MatchSet> getAllMatchSets() {
        return matchSetRepository.findAll();
    }

}
