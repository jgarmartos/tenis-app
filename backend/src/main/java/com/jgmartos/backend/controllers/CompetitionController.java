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

import com.jgmartos.backend.models.Competition;
import com.jgmartos.backend.services.CompetitionService;

@RestController
@RequestMapping("/competitions")
public class CompetitionController {

    @Autowired
    private CompetitionService competitionService;

    @PostMapping
    public Competition createCompetition(@RequestBody Competition competition) {
        return competitionService.createCompetition(competition);
    }

    @GetMapping("/{id}")
    public Competition getCompetition(Integer id) {
        return competitionService.getCompetition(id);
    }

    @PutMapping("/{id}")
    public Competition updateCompetition(Competition competition) {
        return competitionService.updateCompetition(competition);
    }

    @DeleteMapping("/{id}")
    public void deleteCompetition(Integer id) {
        competitionService.deleteCompetition(id);
    }

    @GetMapping
    public List<Competition> getAllCompetitions() {
        return competitionService.getAllCompetitions();
    }


}
