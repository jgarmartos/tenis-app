package com.jgmartos.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sets")
@Data
public class Set {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @Column(name = "number_set", nullable = false)
    private int numberSet;

    @ManyToOne
    @JoinColumn(name = "winner_player_id")
    private Player winner;

    @Column(name = "player_1_score", nullable = false)
    private int player1Score;

    @Column(name = "player_2_score", nullable = false)
    private int player2Score;

    @Column(name = "super", nullable = false)
    private String type;
}


