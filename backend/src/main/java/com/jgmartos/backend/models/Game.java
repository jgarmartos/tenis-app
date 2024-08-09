package com.jgmartos.backend.models;

import jakarta.persistence.*;

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

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Set getSet() {
        return set;
    }

    public void setSet(Set set) {
        this.set = set;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public int getWinner() {
        return winner;
    }

    public void setWinner(int winner) {
        this.winner = winner;
    }
}

