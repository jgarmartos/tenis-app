package com.jgmartos.backend.models.statistics;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class PlayerStatisticsByMatch {
    private List<SetStatistics> setStatistics = new ArrayList<>();

    private Statistics statistics;
}
