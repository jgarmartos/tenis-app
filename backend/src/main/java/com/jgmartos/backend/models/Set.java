package com.jgmartos.backend.models;

import jakarta.persistence.*;

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

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWinner() {
        return winner;
    }

    public void setWinner(int winner) {
        this.winner = winner;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}

