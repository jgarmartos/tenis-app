package com.jgmartos.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "matches")
@Data
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "player_1_id", nullable = false)
    private Player player1;

    @ManyToOne
    @JoinColumn(name = "player_2_id", nullable = false)
    private Player player2;

    @ManyToOne
    @JoinColumn(name = "competition_id")
    private Competition competition;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

    @Column(nullable = false)
    private Date date;

    @Column(name = "start_time", nullable = false)
    private Time startTime;

    @Column(name = "end_time")
    private Time endTime;

    @ManyToOne
    @JoinColumn(name = "winner_player_id")
    private Player winner;
}
