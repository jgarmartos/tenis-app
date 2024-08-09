package com.jgmartos.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.MatchSet;
import com.jgmartos.backend.repositories.MatchSetRepository;

@Service
public class MatchSetService {

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

    //get all match sets
    public List<MatchSet> getAllMatchSets() {
       return matchSetRepository.findAll();
    }

}


