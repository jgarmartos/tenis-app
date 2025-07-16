package com.jgmartos.backend.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.jgmartos.backend.models.Match;
import com.jgmartos.backend.models.Place;
import com.jgmartos.backend.repositories.MatchRepository;
import com.jgmartos.backend.repositories.PlaceRepository;
import com.jgmartos.backend.repositories.PlayerRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MatchService {

    private static final Logger logger = LoggerFactory.getLogger(MatchService.class);

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlaceRepository placeRepository;

    /**
     * Create a new match
     *
     * @param match the match to create
     * @return the created match
     */
    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    /**
     * Get a match by its ID
     *
     * @param id the match ID
     * @return the match or null if not found
     */
    public Match getMatch(Integer id) {
        return matchRepository.findById(id).orElse(null);
    }

    /**
     * Update an existing match
     *
     * @param match the match to update
     * @return the updated match
     */
    public Match updateMatch(Match match) {
        return matchRepository.save(match);
    }

    /**
     * Update the winner of a match
     *
     * @param id       the match ID
     * @param winnerId the winner player ID
     * @return the updated match
     * @throws IllegalArgumentException if match is not found
     */
    public Match updateWinner(Integer id, Integer winnerId) {
        Match match = matchRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Match not found"));
        match.setWinner(playerRepository.findById(winnerId).orElse(null));
        return matchRepository.save(match);
    }

    /**
     * Delete a match by its ID
     *
     * @param id the match ID to delete
     */
    public void deleteMatch(Integer id) {
        matchRepository.deleteById(id);
    }

    /**
     * Get all matches
     *
     * @return list of all matches
     */
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    /**
     * Get all matches by player
     *
     * @param playerId the player ID
     * @return list of matches for the specified player
     */
    public List<Match> getMatchesByPlayer(Integer playerId) {
        return matchRepository.findByPlayer1IdOrPlayer2Id(playerId, playerId);
    }

    /**
     * Get all matches by place
     *
     * @param placeId the ID of the place
     * @return list of matches at the specified place
     * @throws IllegalArgumentException if placeId is null
     * @throws EntityNotFoundException  if place is not found
     * @throws RuntimeException if there is an error accessing data from the database
     */
    public List<Match> getMatchesByPlace(Integer placeId) {

        if (placeId == null) {
            throw new IllegalArgumentException("Place ID cannot be null");
        }

        logger.info("Fetching matches for place ID: {}", placeId);

        try {

            // Check if place exists first
            placeRepository.findById(placeId)
                    .orElseThrow(() -> new EntityNotFoundException("Place with ID " + placeId + " not found"));

            logger.info("Place with ID {} found, fetching matches", placeId);

            // Fetch matches for the place
            List<Match> matches = matchRepository.findByPlaceId(placeId);

            if (matches.isEmpty()) {
                logger.warn("No matches found for place ID: {}", placeId);
            } else {
                logger.info("Found {} matches for place ID: {}", matches.size(), placeId);
            }

            return matchRepository.findByPlaceId(placeId);

        } catch (DataAccessException e) {
            logger.error("Error accessing data for place ID: {}", placeId, e);
            throw new RuntimeException("Error fetching matches for place ID: " + placeId, e);
        }
    }

    /**
     * Update the place of a match
     *
     * @param matchId the match ID
     * @param placeId the new place ID
     * @return the updated match
     * @throws IllegalArgumentException if matchId or placeId is null or invalid
     * @throws EntityNotFoundException if match or place is not found
     * @throws RuntimeException if there is an error accessing data from the database
     */
    public Match updateMatchPlace(Integer matchId, Integer placeId) {
        // Critical validations - always keep these
        if (matchId == null || matchId <= 0) {
            throw new IllegalArgumentException("Match ID must be a positive number");
        }
        if (placeId == null || placeId <= 0) {
            throw new IllegalArgumentException("Place ID must be a positive number");
        }

        logger.info("Updating place for match ID: {} to place ID: {}", matchId, placeId);

        try {
            // Find match
            Match match = matchRepository.findById(matchId)
                    .orElseThrow(() -> new EntityNotFoundException("Match with ID " + matchId + " not found"));

            // Find place
            Place place = placeRepository.findById(placeId)
                    .orElseThrow(() -> new EntityNotFoundException("Place with ID " + placeId + " not found"));

            // Update and save
            match.setPlace(place);
            Match updatedMatch = matchRepository.save(match);
            
            logger.info("Successfully updated match ID: {} with new place ID: {}", matchId, placeId);
            return updatedMatch;

        } catch (DataAccessException e) {
            logger.error("Error updating match place for match ID: {} and place ID: {}", matchId, placeId, e);
            throw new RuntimeException("Error updating match place: " + e.getMessage(), e);
        }
    }

}
