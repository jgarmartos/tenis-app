package com.jgmartos.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jgmartos.backend.models.Place;
import com.jgmartos.backend.services.PlaceService;

/**
 * REST controller for managing tennis court places. Provides CRUD operations for Place entities through HTTP endpoints.
 */
@RestController @RequestMapping("/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    /**
     * Creates a new tennis court place.
     *
     * @param place the place entity to create
     * @return the created place with generated ID
     */
    @PostMapping
    public Place createPlace(@RequestBody Place place) {
        return placeService.createPlace(place);
    }

    /**
     * Retrieves a specific place by its ID.
     *
     * @param id the unique identifier of the place
     * @return the place entity if found
     */
    @GetMapping("/{id}")
    public Place getPlace(@PathVariable Integer id) {
        return placeService.getPlace(id);
    }

    /**
     * Updates an existing place with new information.
     *
     * @param id    the unique identifier of the place to update
     * @param place the place entity with updated information
     * @return the updated place entity
     */
    @PutMapping("/{id}")
    public Place updatePlace(@PathVariable Integer id, @RequestBody Place place) {
        // Use the new update method that merges existing data
        return placeService.updatePlace(id, place);
    }

    /**
     * Deletes a place by its ID.
     *
     * @param id the unique identifier of the place to delete
     */
    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Integer id) {
        placeService.deletePlace(id);
    }

    /**
     * Retrieves all places in the system.
     *
     * @return list of all places
     */
    @GetMapping
    public List<Place> getAllPlaces() {
        return placeService.getAllPlaces();
    }

}
