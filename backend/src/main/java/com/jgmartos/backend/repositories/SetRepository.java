package com.jgmartos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Set;

public interface SetRepository extends JpaRepository<Set, Integer> {

}
