package com.jgmartos.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "set", nullable = false)
    private Set set;

    @Column(name = "result", nullable = false, length = 45)
    private String result;

    @Column(name = "winner", nullable = false)
    private int winner;

    // Constructors
    public Game() {}

    public Game(Set set, String result, int winner) {
        this.set = set;
        this.result = result;
        this.winner = winner;
    }
}

