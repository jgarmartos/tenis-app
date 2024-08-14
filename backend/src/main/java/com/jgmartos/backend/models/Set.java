package com.jgmartos.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "sets")
public class Set {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "winner", nullable = false)
    private int winner;

    @Column(name = "result", nullable = false, length = 45)
    private String result;

    // Constructors
    public Set() {}

    public Set(int winner, String result) {
        this.winner = winner;
        this.result = result;
    }
}

