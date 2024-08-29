package com.jgmartos.backend.models;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "games")
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "set_id", nullable = false)
    private Set set;

    @Column(name = "game_number", nullable = false)
    private int gameNumber;

    @ManyToOne
    @JoinColumn(name = "winner_player_id")
    private Player winner;

    @Column(name = "player_1_points")
    private Integer player1Points;

    @Column(name = "player_2_points")
    private Integer player2Points;

    @Column(name = "player_1_score", nullable = false)
    private String player1Score;

    @Column(name = "player_2_score", nullable = false)
    private String player2Score;

    @Column(nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "server_id")
    private Player server;
}