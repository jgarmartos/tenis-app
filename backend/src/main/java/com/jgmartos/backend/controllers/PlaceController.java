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

import com.jgmartos.backend.models.Place;
import com.jgmartos.backend.services.PlaceService;

@RestController
@RequestMapping("/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @PostMapping
    public Place createPlace(@RequestBody Place place) {
        return placeService.createPlace(place);
    }

    @GetMapping("/{id}")
    public Place getPlace(Integer id) {
        return placeService.getPlace(id);
    }

    @PutMapping("/{id}")
    public Place updatePlace(Place place) {
        return placeService.updatePlace(place);
    }

    @DeleteMapping("/{id}")
    public void deletePlace(Integer id) {
        placeService.deletePlace(id);;
    }

    @GetMapping
    public List<Place> getAllPlaces() {
        return placeService.getAllPlaces();
    }



}
