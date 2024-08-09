package com.jgmartos.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.Competition;
import com.jgmartos.backend.repositories.CompetitionRepository;

@RestController
@RequestMapping("/competitions")
public class CompetitionController {

    @Autowired
    private CompetitionRepository competitionRepository;

    public Competition createCompetition(Competition competition) {
        return competitionRepository.save(competition);
    }

    public Competition getCompetition(Integer id) {
        return competitionRepository.findById(id).orElse(null);
    }

    public Competition updateCompetition(Competition competition) {
        return competitionRepository.save(competition);
    }

    public void deleteCompetition(Integer id) {
        competitionRepository.deleteById(id);
    }

    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }


}
