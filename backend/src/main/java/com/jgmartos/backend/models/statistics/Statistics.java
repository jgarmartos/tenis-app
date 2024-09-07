package com.jgmartos.backend.models.statistics;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Statistics {
    
    private int gamesWon = 0;

    private int gamesLost = 0;

    private int pointsWon = 0;

    private int pointsLost = 0;

    private int gamesWonAsServer = 0;

    private int gamesLostAsServer = 0;

    private int gamesWonAsReceiver = 0;

    private int gamesLostAsReceiver = 0;

    private int pointsWonAsServer = 0;

    private int pointsLostAsServer = 0;

    private int pointsWonAsReceiver = 0;

    private int pointsLostAsReceiver = 0;

    private int gamesWonTo0 = 0;

    private int gamesWonTo15 = 0;

    private int gamesWonTo30 = 0;

    private int gamesWonTo40 = 0;

    private int gamesLostTo0 = 0;

    private int gamesLostTo15 = 0;

    private int gamesLostTo30 = 0;

    private int gamesLostTo40 = 0;
}
