package com.jgmartos.backend.services;

import java.util.List;

import java.lang.Integer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Game;
import com.jgmartos.backend.models.Match;
import com.jgmartos.backend.models.Player;
import com.jgmartos.backend.models.Set;
import com.jgmartos.backend.models.statistics.MatchStatistics;
import com.jgmartos.backend.models.statistics.PlayerStatisticsByMatch;
import com.jgmartos.backend.models.statistics.SetStatistics;
import com.jgmartos.backend.models.statistics.Statistics;

@Service
public class MatchStatisticsService {

    @Autowired
    private MatchService matchService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private GameService gameService;

    @Autowired
    private SetService setService;

    // @Autowired
    // private playerStatisticsByMatch playerStatisticsByMatch;

    @Autowired
    private MatchStatistics matchStatistics;

    @Autowired
    private PlayerStatisticsByMatch playerStatisticsByMatch;

    public MatchStatistics getMatchStatistics(Integer matchId) {
        matchStatistics = new MatchStatistics();

        matchStatistics.setPlayer1Statistics(getMatchStatisticsByPlayer(matchId, matchService.getMatch(matchId).getPlayer1().getId()));
        matchStatistics.setPlayer2Statistics(getMatchStatisticsByPlayer(matchId, matchService.getMatch(matchId).getPlayer2().getId()));

        return matchStatistics;        
    }

    public PlayerStatisticsByMatch getMatchStatisticsByPlayer(Integer matchId, Integer playerId) {
        playerStatisticsByMatch = new PlayerStatisticsByMatch();
        Match match = matchService.getMatch(matchId);
        List<Set> sets = setService.getSetsByMatch(matchId);
        Player player = playerService.getPlayer(playerId);

        for (Set set : sets) {
            List<Game> games = gameService.getGamesBySet(set.getId());

            Statistics statistics = new Statistics();

            for (Game game : games) {
                if (match.getPlayer1() == player) {
                    if (game.getPlayer1Points() > game.getPlayer2Points()) {
                        statistics.setGamesWon(statistics.getGamesWon() + 1);
                        statistics.setPointsWon(statistics.getPointsWon() + game.getPlayer1Points());
                        statistics.setPointsLost(statistics.getPointsLost() + game.getPlayer2Points());
                        if (game.getPlayer2Points() == 0) {
                            statistics.setGamesWonTo0(statistics.getGamesWonTo0() + 1);
                        } else if (game.getPlayer2Points() == 1) {
                            statistics.setGamesWonTo15(statistics.getGamesWonTo15() + 1);
                        } else if (game.getPlayer2Points() == 2) {
                            statistics.setGamesWonTo30(statistics.getGamesWonTo30() + 1);
                        } else if (game.getPlayer2Points() == 3) {
                            statistics.setGamesWonTo40(statistics.getGamesWonTo40() + 1);
                        }

                        if (game.getServer() == match.getPlayer1()) {
                            statistics.setGamesWonAsServer(statistics.getGamesWonAsServer() + 1);
                            statistics
                                    .setPointsWonAsServer(statistics.getPointsWonAsServer() + game.getPlayer1Points());
                            statistics.setPointsLostAsServer(
                                    statistics.getPointsLostAsServer() + game.getPlayer2Points());
                        } else if (game.getServer() == match.getPlayer2()) {
                            statistics.setGamesWonAsReceiver(statistics.getGamesWonAsReceiver() + 1);
                            statistics.setPointsWonAsReceiver(
                                    statistics.getPointsWonAsReceiver() + game.getPlayer1Points());
                            statistics.setPointsLostAsReceiver(
                                    statistics.getPointsLostAsReceiver() + game.getPlayer2Points());
                        }
                    } else {
                        statistics.setGamesLost(statistics.getGamesLost() + 1);
                        statistics.setPointsWon(statistics.getPointsWon() + game.getPlayer1Points());
                        statistics.setPointsLost(statistics.getPointsLost() + game.getPlayer2Points());
                        if (game.getPlayer1Points() == 0) {
                            statistics.setGamesLostTo0(statistics.getGamesLostTo0() + 1);
                        } else if (game.getPlayer1Points() == 1) {
                            statistics.setGamesLostTo15(statistics.getGamesLostTo15() + 1);
                        } else if (game.getPlayer1Points() == 2) {
                            statistics.setGamesLostTo30(statistics.getGamesLostTo30() + 1);
                        } else if (game.getPlayer1Points() == 3) {
                            statistics.setGamesLostTo40(statistics.getGamesLostTo40() + 1);
                        }

                        if (game.getServer() == match.getPlayer2()) {
                            statistics.setGamesLostAsReceiver(statistics.getGamesLostAsReceiver() + 1);
                            statistics.setPointsWonAsReceiver(
                                    statistics.getPointsWonAsReceiver() + game.getPlayer1Points());
                            statistics.setPointsLostAsReceiver(
                                    statistics.getPointsLostAsReceiver() + game.getPlayer2Points());
                        } else if (game.getServer() == match.getPlayer1()) {
                            statistics.setGamesLostAsServer(statistics.getGamesLostAsServer() + 1);
                            statistics.setPointsWonAsServer(
                                    statistics.getPointsWonAsServer() + game.getPlayer1Points());
                            statistics.setPointsLostAsServer(
                                    statistics.getPointsLostAsServer() + game.getPlayer2Points());
                        }
                    }
                } else if (match.getPlayer2() == player) {
                    if (game.getPlayer2Points() > game.getPlayer1Points()) {
                        statistics.setGamesWon(statistics.getGamesWon() + 1);
                        statistics.setPointsWon(statistics.getPointsWon() + game.getPlayer2Points());
                        statistics.setPointsLost(statistics.getPointsLost() + game.getPlayer1Points());
                        if (game.getPlayer1Points() == 0) {
                            statistics.setGamesWonTo0(statistics.getGamesWonTo0() + 1);
                        } else if (game.getPlayer1Points() == 1) {
                            statistics.setGamesWonTo15(statistics.getGamesWonTo15() + 1);
                        } else if (game.getPlayer1Points() == 2) {
                            statistics.setGamesWonTo30(statistics.getGamesWonTo30() + 1);
                        } else if (game.getPlayer1Points() == 3) {
                            statistics.setGamesWonTo40(statistics.getGamesWonTo40() + 1);
                        }

                        if (game.getServer() == match.getPlayer2()) {
                            statistics.setGamesWonAsServer(statistics.getGamesWonAsServer() + 1);
                            statistics
                                    .setPointsWonAsServer(statistics.getPointsWonAsServer() + game.getPlayer2Points());
                            statistics.setPointsLostAsServer(
                                    statistics.getPointsLostAsServer() + game.getPlayer1Points());
                        } else if (game.getServer() == match.getPlayer1()) {
                            statistics.setGamesWonAsReceiver(statistics.getGamesWonAsReceiver() + 1);
                            statistics.setPointsWonAsReceiver(
                                    statistics.getPointsWonAsReceiver() + game.getPlayer2Points());
                            statistics.setPointsLostAsReceiver(
                                    statistics.getPointsLostAsReceiver() + game.getPlayer1Points());
                        }

                    } else {
                        statistics.setGamesLost(statistics.getGamesLost() + 1);
                        statistics.setPointsWon(statistics.getPointsWon() + game.getPlayer2Points());
                        statistics.setPointsLost(statistics.getPointsLost() + game.getPlayer1Points());
                        if (game.getPlayer2Points() == 0) {
                            statistics.setGamesLostTo0(statistics.getGamesLostTo0() + 1);
                        } else if (game.getPlayer2Points() == 1) {
                            statistics.setGamesLostTo15(statistics.getGamesLostTo15() + 1);
                        } else if (game.getPlayer2Points() == 2) {
                            statistics.setGamesLostTo30(statistics.getGamesLostTo30() + 1);
                        } else if (game.getPlayer2Points() == 3) {
                            statistics.setGamesLostTo40(statistics.getGamesLostTo40() + 1);
                        }

                        if (game.getServer() == match.getPlayer1()) {
                            statistics.setGamesLostAsReceiver(statistics.getGamesLostAsReceiver() + 1);
                            statistics.setPointsWonAsReceiver(
                                    statistics.getPointsWonAsReceiver() + game.getPlayer2Points());
                            statistics.setPointsLostAsReceiver(
                                    statistics.getPointsLostAsReceiver() + game.getPlayer1Points());
                        } else if (game.getServer() == match.getPlayer2()) {
                            statistics.setGamesLostAsServer(statistics.getGamesLostAsServer() + 1);
                            statistics.setPointsWonAsServer(
                                    statistics.getPointsWonAsServer() + game.getPlayer2Points());
                            statistics.setPointsLostAsServer(
                                    statistics.getPointsLostAsServer() + game.getPlayer1Points());
                        }
                    }
                }

            }
            playerStatisticsByMatch.getSetStatistics().add(new SetStatistics(statistics));
        }
        
        Statistics playerStatisticsAdd = new Statistics();
        playerStatisticsAdd.setGamesWon(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesWon()).sum());
        playerStatisticsAdd.setGamesLost(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesLost()).sum());
        playerStatisticsAdd.setPointsWon(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getPointsWon()).sum());
        playerStatisticsAdd.setPointsLost(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getPointsLost()).sum());
        playerStatisticsAdd.setGamesWonTo0(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesWonTo0()).sum());
        playerStatisticsAdd.setGamesWonTo15(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesWonTo15()).sum());
        playerStatisticsAdd.setGamesWonTo30(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesWonTo30()).sum());
        playerStatisticsAdd.setGamesWonTo40(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesWonTo40()).sum());
        playerStatisticsAdd.setGamesLostTo40(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesLostTo40()).sum());
        playerStatisticsAdd.setGamesLostTo30(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesLostTo30()).sum());
        playerStatisticsAdd.setGamesLostTo15(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesLostTo15()).sum());
        playerStatisticsAdd.setGamesLostTo0(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesLostTo0()).sum());
        playerStatisticsAdd.setGamesWonAsServer(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesWonAsServer()).sum());
        playerStatisticsAdd.setGamesWonAsReceiver(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesWonAsReceiver()).sum());
        playerStatisticsAdd.setGamesLostAsServer(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesLostAsServer()).sum());
        playerStatisticsAdd.setGamesLostAsReceiver(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getGamesLostAsReceiver()).sum());
        playerStatisticsAdd.setPointsWonAsServer(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getPointsWonAsServer()).sum());
        playerStatisticsAdd.setPointsWonAsReceiver(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getPointsWonAsReceiver()).sum());
        playerStatisticsAdd.setPointsLostAsServer(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getPointsLostAsServer()).sum());
        playerStatisticsAdd.setPointsLostAsReceiver(playerStatisticsByMatch.getSetStatistics().stream().mapToInt(s -> s.getStatistics().getPointsLostAsReceiver()).sum());
        playerStatisticsByMatch.setStatistics(playerStatisticsAdd);

        return playerStatisticsByMatch;
    }
}
