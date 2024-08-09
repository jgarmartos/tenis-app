package com.jgmartos.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "match_sets")
public class MatchSet {

    @EmbeddedId
    private MatchSetId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("matchId")
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("setId")
    @JoinColumn(name = "set_id", nullable = false)
    private Set set;

    // Getters and Setters

    public MatchSetId getId() {
        return id;
    }

    public void setId(MatchSetId id) {
        this.id = id;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public Set getSet() {
        return set;
    }

    public void setSet(Set set) {
        this.set = set;
    }
}

