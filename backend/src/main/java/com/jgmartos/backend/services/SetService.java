package com.jgmartos.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Set;
import com.jgmartos.backend.repositories.SetRepository;

@Service
public class SetService {

    @Autowired
    private SetRepository setRepository;

    public Set createSet(Set set) {
        return setRepository.save(set);
    }

    public Set getSet(Integer id) {
        return setRepository.findById(id).orElse(null);
    }

    public Set updateSet(Set set) {
        return setRepository.save(set);
    }

    public void deleteSet(Integer id) {
        setRepository.deleteById(id);
    }

    //get all sets
    public List<Set> getAllSets() {
        return setRepository.findAll();
    }


}
