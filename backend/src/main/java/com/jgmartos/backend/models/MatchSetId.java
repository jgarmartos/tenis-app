package com.jgmartos.backend.models;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@Embeddable
public class MatchSetId implements Serializable {

    private int matchId;
    private int setId;

    // Constructors
    public MatchSetId() {}

    public MatchSetId(int matchId, int setId) {
        this.matchId = matchId;
        this.setId = setId;
    }

    // Override equals and hashCode for composite key

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MatchSetId that = (MatchSetId) o;
        return matchId == that.matchId && setId == that.setId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchId, setId);
    }
}

