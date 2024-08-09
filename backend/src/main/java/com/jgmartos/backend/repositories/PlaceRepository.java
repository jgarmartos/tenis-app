package com.jgmartos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Place;

public interface PlaceRepository extends JpaRepository<Place, Integer> {

}
