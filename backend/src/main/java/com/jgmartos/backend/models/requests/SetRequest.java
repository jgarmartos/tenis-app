package com.jgmartos.backend.models.requests;

import lombok.Data;

@Data
public class SetRequest {
    private int matchId;

    private int setNumber;

    private int winner;

    private int scorePlayer1;

    private int scorePlayer2;

    private String type;
}
