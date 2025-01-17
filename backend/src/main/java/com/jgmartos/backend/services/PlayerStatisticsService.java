package com.jgmartos.backend.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Game;
import com.jgmartos.backend.models.Match;
import com.jgmartos.backend.models.Set;
import com.jgmartos.backend.models.statistics.PlayerStatistics;

@Service
public class PlayerStatisticsService {

    private final MatchService matchService;
    private final PlayerService playerService;
    private final GameService gameService;
    private final SetService setService;

    @Autowired
    public PlayerStatisticsService(MatchService matchService, PlayerService playerService,
            GameService gameService, SetService setService) {
        this.matchService = matchService;
        this.playerService = playerService;
        this.gameService = gameService;
        this.setService = setService;
    }

    public PlayerStatistics getPlayerStatistics(Integer playerId) {
        List<Match> matches = matchService.getMatchesByPlayer(playerId);
        return calculateStatistics(matches, playerId);
    }

    private PlayerStatistics calculateStatistics(List<Match> matches, Integer playerId) {
        PlayerStatistics stats = new PlayerStatistics();
        stats.setMatchesPlayed(matches.size());

        for (Match match : matches) {
            processMatch(match, playerId, stats);
        }

        calculatePercentages(stats);

        return stats;
    }

    private void calculatePercentages(PlayerStatistics stats) {
        stats.setWinPercentage(stats.getMatchesPlayed() > 0
                ? round((double) stats.getMatchesWon() / stats.getMatchesPlayed() * 100, 1)
                : 0);
        stats.setSetsWinPercentage(stats.getSetsPlayed() > 0
                ? round((double) stats.getSetsWon() / stats.getSetsPlayed() * 100, 1)
                : 0);
        stats.setGamesWinPercentage(stats.getGamesPlayed() > 0
                ? round((double) stats.getGamesWon() / stats.getGamesPlayed() * 100, 1)
                : 0);
        stats.setPointsWinPercentage(stats.getPointsPlayed() > 0
                ? round((double) stats.getPointsWon() / stats.getPointsPlayed() * 100, 1)
                : 0);
        stats.setGamesWinPercentageAsServer(stats.getGamesWonAsServer() > 0
                ? round((double) stats.getGamesWonAsServer() / (stats.getGamesWonAsServer() + stats.getGamesLostAsServer()) * 100, 1)
                : 0);
        stats.setGamesWinPercentageAsReceiver(stats.getGamesWonAsReceiver() > 0
                ? round((double) stats.getGamesWonAsReceiver() / (stats.getGamesWonAsReceiver() + stats.getGamesLostAsReceiver()) * 100, 1)
                : 0);
    
        stats.setPointsWonPerMatch(stats.getMatchesPlayed() > 0
                ? round((double) stats.getPointsWon() / stats.getMatchesPlayed(), 1)
                : 0);
    
        stats.setPointsLostPerMatch(stats.getMatchesPlayed() > 0
                ? round((double) stats.getPointsLost() / stats.getMatchesPlayed(), 1)
                : 0);

        stats.setPointsWonPerGame(stats.getGamesPlayed() > 0
                ? round((double) stats.getPointsWon() / stats.getGamesPlayed(), 1)
                : 0);

        stats.setPointsLostPerGame(stats.getGamesPlayed() > 0
                ? round((double) stats.getPointsLost() / stats.getGamesPlayed(), 1)
                : 0);   
    }

    private double round(double value, int places) {
    if (places < 0) throw new IllegalArgumentException();

    BigDecimal bd = BigDecimal.valueOf(value);
    bd = bd.setScale(places, RoundingMode.HALF_UP);
    return bd.doubleValue();
}

    private void processMatch(Match match, Integer playerId, PlayerStatistics stats) {
        // TODO: manage the possibility of a match without winner
        boolean isWinner = match.getWinner().equals(playerService.getPlayer(playerId));
        updateMatchStats(stats, isWinner);

        List<Set> sets = setService.getSetsByMatch(match.getId());
        for (Set set : sets) {
            processSet(set, match, playerId, stats);
        }
    }

    private void processSet(Set set, Match match, Integer playerId, PlayerStatistics stats) {
        stats.setSetsPlayed(stats.getSetsPlayed() + 1);

        boolean isWinner = false;
        if (set.getWinner() == null) {
            isWinner = false;
        } else {
            isWinner = set.getWinner().equals(playerService.getPlayer(playerId));
        }

        updateSetStats(stats, isWinner);

        List<Game> games = gameService.getGamesBySet(set.getId());
        for (Game game : games) {
            processGame(game, match, playerId, stats);
        }
    }

    private void processGame(Game game, Match match, Integer playerId, PlayerStatistics stats) {
        stats.setGamesPlayed(stats.getGamesPlayed() + 1);
        stats.setPointsPlayed(stats.getPointsPlayed() + game.getPlayer1Points() + game.getPlayer2Points());

        boolean isPlayer1 = match.getPlayer1().equals(playerService.getPlayer(playerId));
        boolean isGameWinner = (isPlayer1 && game.getPlayer1Points() > game.getPlayer2Points()) ||
                (!isPlayer1 && game.getPlayer2Points() > game.getPlayer1Points());

        updateGameStats(stats, game, isGameWinner, isPlayer1, match);
    }

    private void updateMatchStats(PlayerStatistics stats, boolean isWinner) {
        if (isWinner) {
            stats.setMatchesWon(stats.getMatchesWon() + 1);
        } else {
            stats.setMatchesLost(stats.getMatchesLost() + 1);
        }
    }

    private void updateSetStats(PlayerStatistics stats, boolean isWinner) {
        if (isWinner) {
            stats.setSetsWon(stats.getSetsWon() + 1);
        } else {
            stats.setSetsLost(stats.getSetsLost() + 1);
        }
    }

    private void updateGameStats(PlayerStatistics stats, Game game, boolean isGameWinner,
            boolean isPlayer1, Match match) {
        if (isGameWinner) {
            stats.setGamesWon(stats.getGamesWon() + 1);
            updatePointsStats(stats, game, isPlayer1, true);
            if (isPlayer1) {
                categorizeGameByPoints(stats, game.getPlayer1Points(), game.getPlayer2Points(), true);
            } else {
                categorizeGameByPoints(stats, game.getPlayer2Points(), game.getPlayer1Points(), true);
            }
        } else {
            stats.setGamesLost(stats.getGamesLost() + 1);
            updatePointsStats(stats, game, isPlayer1, false);
            if (isPlayer1) {
                categorizeGameByPoints(stats, game.getPlayer1Points(), game.getPlayer2Points(), true);
            } else {
                categorizeGameByPoints(stats, game.getPlayer2Points(), game.getPlayer1Points(), true);
            }
        }

        updateServeStats(stats, game, isPlayer1, match);
    }

    private void updatePointsStats(PlayerStatistics stats, Game game, boolean isPlayer1, boolean isWinner) {
        if (isWinner) {
            stats.setPointsWon(stats.getPointsWon() + (isPlayer1 ? game.getPlayer1Points() : game.getPlayer2Points()));
            stats.setPointsLost(
                    stats.getPointsLost() + (isPlayer1 ? game.getPlayer2Points() : game.getPlayer1Points()));
        } else {
            stats.setPointsWon(stats.getPointsWon() + (isPlayer1 ? game.getPlayer1Points() : game.getPlayer2Points()));
            stats.setPointsLost(
                    stats.getPointsLost() + (isPlayer1 ? game.getPlayer2Points() : game.getPlayer1Points()));
        }
    }

    private void categorizeGameByPoints(PlayerStatistics stats, int playerPoints, int opponentPoints, boolean isWon) {
        if (opponentPoints == 0) {
            stats.setGamesWonTo0(stats.getGamesWonTo0() + 1);
        } else if (opponentPoints == 1) {
            stats.setGamesWonTo15(stats.getGamesWonTo15() + 1);
        } else if (opponentPoints == 2) {
            stats.setGamesWonTo30(stats.getGamesWonTo30() + 1);
        } else if (opponentPoints == 3) {
            if (isWon)
                stats.setGamesWonTo40(stats.getGamesWonTo40() + 1);
            else
                stats.setGamesLostTo40(stats.getGamesLostTo40() + 1);
        } else if (opponentPoints == 4) {
            if (playerPoints == 0)
                stats.setGamesLostTo0(stats.getGamesLostTo0() + 1);
            else if (playerPoints == 1)
                stats.setGamesLostTo15(stats.getGamesLostTo15() + 1);
            else if (playerPoints == 2)
                stats.setGamesLostTo30(stats.getGamesLostTo30() + 1);
            else if (playerPoints >= 3)
                stats.setGamesLostTo40(stats.getGamesLostTo40() + 1);
        }
    }

    private void updateServeStats(PlayerStatistics stats, Game game, boolean isPlayer1, Match match) {
        boolean isServer = (isPlayer1 && game.getServer().equals(match.getPlayer1())) ||
                (!isPlayer1 && game.getServer().equals(match.getPlayer2()));

        if (isServer) {
            // Actualizar juegos ganados/perdidos como servidor
            if (isPlayer1 ? game.getPlayer1Points() > game.getPlayer2Points()
                    : game.getPlayer2Points() > game.getPlayer1Points()) {
                stats.setGamesWonAsServer(stats.getGamesWonAsServer() + 1);
            } else {
                stats.setGamesLostAsServer(stats.getGamesLostAsServer() + 1);
            }

            // Actualizar puntos ganados/perdidos como servidor
            stats.setPointsWonAsServer(
                    stats.getPointsWonAsServer() + (isPlayer1 ? game.getPlayer1Points() : game.getPlayer2Points()));
            stats.setPointsLostAsServer(
                    stats.getPointsLostAsServer() + (isPlayer1 ? game.getPlayer2Points() : game.getPlayer1Points()));
        } else {
            // Actualizar juegos ganados/perdidos como receptor
            if (isPlayer1 ? game.getPlayer1Points() > game.getPlayer2Points()
                    : game.getPlayer2Points() > game.getPlayer1Points()) {
                stats.setGamesWonAsReceiver(stats.getGamesWonAsReceiver() + 1);
            } else {
                stats.setGamesLostAsReceiver(stats.getGamesLostAsReceiver() + 1);
            }

            // Actualizar puntos ganados/perdidos como receptor
            stats.setPointsWonAsReceiver(
                    stats.getPointsWonAsReceiver() + (isPlayer1 ? game.getPlayer1Points() : game.getPlayer2Points()));
            stats.setPointsLostAsReceiver(
                    stats.getPointsLostAsReceiver() + (isPlayer1 ? game.getPlayer2Points() : game.getPlayer1Points()));
        }
    }

}
