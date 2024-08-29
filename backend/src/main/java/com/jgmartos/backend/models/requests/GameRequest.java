package com.jgmartos.backend.models.requests;

import lombok.Data;

@Data
public class GameRequest {

    private int set;

    private int gameNumber;

    private int winner;

    private int pointsPlayer1;

    private int pointsPlayer2;

    private String scorePlayer1;

    private String scorePlayer2;

    private String type;

    private int server;

}
