package com.jgmartos.backend.models;

import com.jgmartos.backend.models.statistics.PlayerStatistics;

import lombok.Data;

@Data
public class PlayerResponse {

    private int id;

    private String name;

    private String forehand;

    private String avatar;

    private PlayerStatistics playerStatistics;
    
}
