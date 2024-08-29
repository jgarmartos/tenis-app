package com.jgmartos.backend.models.requests;

import java.sql.Time;
import java.util.Date;

import lombok.Data;

@Data
public class MatchRequest {
    private int player1;
    private int player2;
    private int competition;
    private int place;
    private Date date;
    private long startTime;
    private long endTime;
    private int winnerId;
    
    // Getters and Setters
}
