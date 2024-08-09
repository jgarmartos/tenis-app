package com.jgmartos.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.Set;
import com.jgmartos.backend.repositories.SetRepository;

@RestController
@RequestMapping("/sets")
public class SetController {

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

    public List<Set> getAllSets() {
        return setRepository.findAll();
    }

}
