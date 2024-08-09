package com.jgmartos.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Place;
import com.jgmartos.backend.repositories.PlaceRepository;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }
    
    public Place getPlace(Integer id) {
        return placeRepository.findById(id).orElse(null);
    }

    public Place updatePlace(Place place) {
        return placeRepository.save(place);
    }

    public void deletePlace(Integer id) {
        placeRepository.deleteById(id);
    }

    //get all places
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }


}
