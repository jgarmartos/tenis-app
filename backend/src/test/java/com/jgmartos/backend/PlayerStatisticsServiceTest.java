package com.jgmartos.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.jgmartos.backend.models.Game;
import com.jgmartos.backend.models.Match;
import com.jgmartos.backend.models.Player;
import com.jgmartos.backend.models.Set;
import com.jgmartos.backend.models.statistics.PlayerStatistics;
import com.jgmartos.backend.services.GameService;
import com.jgmartos.backend.services.MatchService;
import com.jgmartos.backend.services.PlayerService;
import com.jgmartos.backend.services.PlayerStatisticsService;
import com.jgmartos.backend.services.SetService;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class PlayerStatisticsServiceTest {

    @InjectMocks
    private PlayerStatisticsService playerStatisticsService;

    @Mock
    private MatchService matchService;

    @Mock
    private PlayerService playerService;

    @Mock
    private GameService gameService;

    @Mock
    private SetService setService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetPlayerStatistics() {
        // Mock player
        Player player = new Player();
        player.setId(1);
        when(playerService.getPlayer(1)).thenReturn(player);

        // Mock matches
        Match match1 = new Match();
        match1.setId(1);
        match1.setWinner(player);

        Match match2 = new Match();
        match2.setId(2);
        match2.setWinner(new Player()); // Another player won

        List<Match> matches = Arrays.asList(match1, match2);
        when(matchService.getMatchesByPlayer(1)).thenReturn(matches);

        // Mock sets
        Set set1 = new Set();
        set1.setId(1);
        set1.setWinner(player);

        Set set2 = new Set();
        set2.setId(2);
        set2.setWinner(new Player()); // Another player won

        when(setService.getSetsByMatch(1)).thenReturn(Collections.singletonList(set1));
        when(setService.getSetsByMatch(2)).thenReturn(Collections.singletonList(set2));

        // Mock games
        Game game1 = new Game();
        game1.setPlayer1Points(4);
        game1.setPlayer2Points(2);

        Game game2 = new Game();
        game2.setPlayer1Points(2);
        game2.setPlayer2Points(4);

        when(gameService.getGamesBySet(1)).thenReturn(Collections.singletonList(game1));
        when(gameService.getGamesBySet(2)).thenReturn(Collections.singletonList(game2));

        // Call the public method
        PlayerStatistics stats = playerStatisticsService.getPlayerStatistics(1);

        // Assertions
        assertEquals(2, stats.getMatchesPlayed());
        assertEquals(1, stats.getMatchesWon());
        assertEquals(1, stats.getMatchesLost());
        assertEquals(2, stats.getSetsPlayed());
        assertEquals(1, stats.getSetsWon());
        assertEquals(1, stats.getSetsLost());
        assertEquals(2, stats.getGamesPlayed());
        assertEquals(1, stats.getGamesWon());
        assertEquals(1, stats.getGamesLost());
        assertEquals(12, stats.getPointsPlayed());
        assertEquals(6, stats.getPointsWon());
        assertEquals(6, stats.getPointsLost());
    }
}