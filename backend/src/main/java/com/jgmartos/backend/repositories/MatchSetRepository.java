package com.jgmartos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.MatchSet;

public interface MatchSetRepository extends JpaRepository<MatchSet, Integer> {

}
