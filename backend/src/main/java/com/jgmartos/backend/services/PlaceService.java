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

    /**
     * Creates a new place in the system
     *
     * @param place The place object to create
     * @return The created place with generated ID
     */
    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }

    /**
     * Retrieves a place by its ID
     *
     * @param id The ID of the place to retrieve
     * @return The place if found, null otherwise
     */
    public Place getPlace(Integer id) {
        return placeRepository.findById(id).orElse(null);
    }

    /**
     * Updates an existing place with new data
     *
     * @param place The place object with updated data (must include ID)
     * @return The updated place
     * @throws IllegalArgumentException if place ID is invalid or place doesn't exist
     */
    public Place updatePlace(Place place) {
        if (place.getId() <= 0) {
            throw new IllegalArgumentException("Place ID must be a positive number for update operation");
        }

        // Check if place exists
        if (!placeRepository.existsById(place.getId())) {
            throw new IllegalArgumentException("Place with ID " + place.getId() + " does not exist");
        }

        return placeRepository.save(place);
    }

    /**
     * Updates an existing place with new data, preserving existing fields if not provided
     *
     * @param id           The ID of the place to update
     * @param updatedPlace The place object with updated data
     * @return The updated place
     * @throws IllegalArgumentException if place ID is invalid or place doesn't exist
     */
    public Place updatePlace(Integer id, Place updatedPlace) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Place ID must be a positive number for update operation");
        }

        // Get existing place
        Place existingPlace = placeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Place with ID " + id + " does not exist"));

        // Update only non-null fields
        if (updatedPlace.getName() != null && !updatedPlace.getName().trim().isEmpty()) {
            existingPlace.setName(updatedPlace.getName());
        }
        if (updatedPlace.getAddress() != null && !updatedPlace.getAddress().trim().isEmpty()) {
            existingPlace.setAddress(updatedPlace.getAddress());
        }
        if (updatedPlace.getCity() != null && !updatedPlace.getCity().trim().isEmpty()) {
            existingPlace.setCity(updatedPlace.getCity());
        }

        return placeRepository.save(existingPlace);
    }

    /**
     * Deletes a place by its ID
     *
     * @param id The ID of the place to delete
     * @throws IllegalArgumentException if place ID is invalid or place doesn't exist
     */
    public void deletePlace(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Place ID must be a positive number for delete operation");
        }

        if (!placeRepository.existsById(id)) {
            throw new IllegalArgumentException("Place with ID " + id + " does not exist");
        }

        placeRepository.deleteById(id);
    }

    /**
     * Retrieves all places from the system
     *
     * @return List of all places
     */
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

}
