package com.jgmartos.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
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
}

