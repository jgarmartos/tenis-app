package com.jgmartos.backend.models.statistics;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class SetStatistics {

    private Statistics statistics;

    public SetStatistics() {
        this.statistics = new Statistics();
    }

    public SetStatistics(Statistics statistics) {
        this.statistics = statistics;
    }
    
}
