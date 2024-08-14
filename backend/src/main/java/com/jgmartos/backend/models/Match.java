package com.jgmartos.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "player_1", nullable = false)
    private int player1;

    @Column(name = "player_2", nullable = false)
    private int player2;

    @Column(name = "result", nullable = false, length = 45)
    private String result;

    @Column(name = "place", nullable = false)
    private int place;

    @Column(name = "competition", nullable = false)
    private int competition;

    @Temporal(TemporalType.DATE)
    @Column(name = "date", nullable = false)
    private Date date;

    @Temporal(TemporalType.TIME)
    @Column(name = "time", nullable = false)
    private Date time;

    @Column(name = "num_sets", nullable = false)
    private int numSets;

    @Column(name = "winner", nullable = false)
    private int winner;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchSet> matchSets;

    public Match() {}

    public Match(int player1, int player2, String result, int place, int competition, Date date, Date time, int numSets, int winner) {
        this.player1 = player1;
        this.player2 = player2;
        this.result = result;
        this.place = place;
        this.competition = competition;
        this.date = date;
        this.time = time;
        this.numSets = numSets;
        this.winner = winner;
    }
}

