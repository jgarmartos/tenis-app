package com.jgmartos.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.Set;
import com.jgmartos.backend.repositories.SetRepository;

@RestController
@RequestMapping("/sets")
public class SetController {

    @Autowired 
    private SetRepository setRepository;

    @PostMapping
    public Set createSet(Set set) {
        return setRepository.save(set);
    }

    @GetMapping("/{id}")
    public Set getSet(Integer id) {
        return setRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Set updateSet(Set set) {
        return setRepository.save(set);
    }

    @DeleteMapping("/{id}")
    public void deleteSet(Integer id) {
        setRepository.deleteById(id);
    }

    @GetMapping
    public List<Set> getAllSets() {
        return setRepository.findAll();
    }

}
