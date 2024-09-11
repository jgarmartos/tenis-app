package com.jgmartos.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.Set;

public interface SetRepository extends JpaRepository<Set, Integer> {

        public List<Set> findByMatchId(Integer matchId);
        
        public void deleteByMatchId(Integer matchId);

}
