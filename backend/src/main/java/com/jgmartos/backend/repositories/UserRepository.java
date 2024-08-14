package com.jgmartos.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jgmartos.backend.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
