package com.jgmartos.backend.models.statistics;


import org.springframework.stereotype.Component;

import lombok.Data;


@Data
@Component
public class MatchStatistics {

    private PlayerStatisticsByMatch player1Statistics = new PlayerStatisticsByMatch();

    private PlayerStatisticsByMatch player2Statistics = new PlayerStatisticsByMatch();

}
