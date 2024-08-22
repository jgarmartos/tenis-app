package com.jgmartos.backend.models.requests;

import lombok.Data;

@Data
public class GameRequest {

    private int set;

    private int gameNumber;

    private int winner;

    private int player1Points;

    private int player2Points;

    private int player1Score;

    private int player2Score;

    private String type;

}
