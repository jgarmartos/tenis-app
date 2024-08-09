package com.jgmartos.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Competition;
import com.jgmartos.backend.repositories.CompetitionRepository;

@Service
public class CompetitionService {

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

    //get all competitions
    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }


}
