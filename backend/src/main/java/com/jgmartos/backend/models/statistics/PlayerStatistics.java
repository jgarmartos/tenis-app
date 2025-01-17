package com.jgmartos.backend.models.statistics;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class PlayerStatistics {

    private int matchesPlayed = 0;

    private int matchesWon = 0;

    private int matchesLost = 0;

    private int setsPlayed = 0;

    private int setsWon = 0;

    private int setsLost = 0;

    private int gamesPlayed = 0;

    private int gamesWon = 0;

    private int gamesLost = 0;

    private int pointsPlayed = 0;

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

    private double winPercentage = 0;

    private double setsWinPercentage = 0;

    private double gamesWinPercentage = 0;

    private double pointsWinPercentage = 0;

    private double gamesWinPercentageAsServer = 0;

    private double gamesWinPercentageAsReceiver = 0;

    private double pointsWinPercentageAsServer = 0;

    private double pointsWinPercentageAsReceiver = 0;

    private double gamesWinPercentageTo0 = 0;

    private double gamesWinPercentageTo15 = 0;

    private double gamesWinPercentageTo30 = 0;

    private double gamesWinPercentageTo40 = 0;

    private double gamesLostPercentageTo0 = 0;

    private double gamesLostPercentageTo15 = 0;

    private double gamesLostPercentageTo30 = 0;

    private double gamesLostPercentageTo40 = 0;

    private double pointsPlayedPerMatch = 0;

    private double pointsWonPerMatch = 0;

    private double pointsLostPerMatch = 0;

    private double gamesPlayedPerMatch = 0;

    private double gamesWonPerMatch = 0;

    private double gamesLostPerMatch = 0;

    private double setsPlayedPerMatch = 0;

    private double setsWonPerMatch = 0;

    private double setsLostPerMatch = 0;

    private double pointsPlayedPerSet = 0;

    private double pointsWonPerSet = 0;

    private double pointsLostPerSet = 0;

    private double gamesPlayedPerSet = 0;

    private double gamesWonPerSet = 0;

    private double gamesLostPerSet = 0;

    private double pointsPlayedPerGame = 0;

    private double pointsWonPerGame = 0;

    private double pointsLostPerGame = 0;
    
}
