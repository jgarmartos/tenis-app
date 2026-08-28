/**
 * Match Creation Service
 * 
 * Handles the complete match creation workflow including sets and games.
 * Separates business logic from UI state management.
 * 
 * @module services/matches/matchCreationService
 */

import type { MatchSubmit } from '@/interfaces/MatchesInterfaces';
import type { SetSubmit } from '@/interfaces/SetsInterfaces';
import type { GameSubmit } from '@/interfaces/GamesInterfaces';
import type { MatchFormData, SetFormData, GameFormData } from '@/interfaces/MatchFormInterfaces';
import { matchService } from './matchService';
import { setService } from '../sets/setService';
import { gameService } from '../games/gameService';

/**
 * Service class for handling match creation workflow
 */
export class MatchCreationService {
    /**
     * Creates a complete match with sets and games
     * @param formData - Form data containing match, sets, and games information
     * @returns Promise resolving to the created match ID
     */
    async createMatch(formData: MatchFormData): Promise<number> {
        try {
            // Create the match first
            const matchSubmit = this.buildMatchSubmit(formData);
            const matchResponse = await matchService.create(matchSubmit);

            // Create sets and games
            await this.createSetsAndGames(formData, matchResponse.id, matchSubmit);

            return matchResponse.id;
        } catch (error) {
            console.error('Error creating match:', error);
            throw error;
        }
    }

    /**
     * Builds MatchSubmit object from form data
     */
    private buildMatchSubmit(formData: MatchFormData): MatchSubmit {
        return {
            player1: formData.player1.id,
            player2: formData.player2.id,
            competition: formData.competition?.id,
            place: formData.place?.id,
            surface: formData.surface,
            date: formData.startTime,
            startTime: formData.startTime.getTime(),
            endTime: formData.startTime.getTime() + 3600000, // Add one hour
            winner: null,
        };
    }

    /**
     * Creates sets and games for the match
     */
    private async createSetsAndGames(
        formData: MatchFormData,
        matchId: number,
        matchSubmit: MatchSubmit
    ): Promise<void> {
        const matchScore = { score1: 0, score2: 0 };

        // Process each set
        for (const [index, setData] of formData.sets.entries()) {
            if (setData.score1 === 0 && setData.score2 === 0) continue;

            const setSubmit = this.buildSetSubmit(setData, matchId, index + 1, formData);
            const setResponse = await setService.create(setSubmit);

            // Create games for this set
            await this.createGamesForSet(setData, setResponse.id, formData);

            // Update match score
            if (setSubmit.winner === formData.player1.id) {
                matchScore.score1++;
            } else if (setSubmit.winner === formData.player2.id) {
                matchScore.score2++;
            }
        }

        // Update match winner
        await this.updateMatchWinner(matchId, matchScore, formData, matchSubmit);
    }

    /**
     * Builds SetSubmit object from set data
     */
    private buildSetSubmit(
        setData: SetFormData,
        matchId: number,
        setNumber: number,
        formData: MatchFormData
    ): SetSubmit {
        return {
            matchId,
            numberSet: setNumber,
            winner: setData.score1 > setData.score2
                ? formData.player1.id
                : setData.score1 < setData.score2
                    ? formData.player2.id
                    : null,
            scorePlayer1: setData.score1,
            scorePlayer2: setData.score2,
            type: setData.type,
        };
    }

    /**
     * Creates games for a specific set
     */
    private async createGamesForSet(
        setData: SetFormData,
        setId: number,
        formData: MatchFormData
    ): Promise<void> {
        if (setData.type === 'Set') {
            await this.createRegularSetGames(setData, setId, formData);
        } else {
            await this.createSuperTieBreakGame(setData, setId, formData);
        }
    }

    /**
     * Creates games for a regular set
     */
    private async createRegularSetGames(
        setData: SetFormData,
        setId: number,
        formData: MatchFormData
    ): Promise<void> {
        for (const [index, gameData] of setData.games.entries()) {
            if (gameData.selectedPuntuation1 === 0 && gameData.selectedPuntuation2 === 0) {
                continue;
            }

            const gameSubmit = this.buildRegularGameSubmit(
                gameData,
                setId,
                index,
                setData.startsServing,
                formData
            );

            await gameService.create(gameSubmit);
        }
    }

    /**
     * Creates a super tie-break game
     */
    private async createSuperTieBreakGame(
        setData: SetFormData,
        setId: number,
        formData: MatchFormData
    ): Promise<void> {
        const gameSubmit: GameSubmit = {
            set: setId,
            gameNumber: 1,
            winner: setData.score1 > setData.score2
                ? formData.player1.id
                : setData.score1 < setData.score2
                    ? formData.player2.id
                    : null,
            scorePlayer1: setData.score1.toString(),
            scorePlayer2: setData.score2.toString(),
            pointsPlayer1: setData.score1,
            pointsPlayer2: setData.score2,
            type: 'tiebreak',
            server: setData.startsServing === 'player1'
                ? formData.player1.id
                : formData.player2.id,
        };

        await gameService.create(gameSubmit);
    }

    /**
     * Builds GameSubmit object for regular games
     */
    private buildRegularGameSubmit(
        gameData: GameFormData,
        setId: number,
        gameIndex: number,
        startsServing: string,
        formData: MatchFormData
    ): GameSubmit {
        const server = this.determineServer(gameIndex, startsServing, formData);
        const isTiebreak = gameIndex === 12;

        return {
            set: setId,
            gameNumber: gameIndex + 1,
            winner: gameData.selectedPuntuation1 > gameData.selectedPuntuation2
                ? formData.player1.id
                : gameData.selectedPuntuation1 < gameData.selectedPuntuation2
                    ? formData.player2.id
                    : null,
            scorePlayer1: gameData.selectedPuntuation1 === 50
                ? 'AD'
                : gameData.selectedPuntuation1.toString(),
            scorePlayer2: gameData.selectedPuntuation2 === 50
                ? 'AD'
                : gameData.selectedPuntuation2.toString(),
            pointsPlayer1: this.calculatePoints(
                gameData.selectedPuntuation1,
                gameData.selectedPuntuation2,
                gameData.deuceNumber,
                isTiebreak
            ),
            pointsPlayer2: this.calculatePoints(
                gameData.selectedPuntuation2,
                gameData.selectedPuntuation1,
                gameData.deuceNumber,
                isTiebreak
            ),
            type: isTiebreak ? 'tiebreak' : 'normal',
            server,
        };
    }

    /**
     * Determines the server for a specific game
     */
    private determineServer(
        gameIndex: number,
        startsServing: string,
        formData: MatchFormData
    ): number {
        const isFirstPlayer = (gameIndex % 2 === 0 && startsServing === 'player1') ||
            (gameIndex % 2 === 1 && startsServing === 'player2');

        return isFirstPlayer ? formData.player1.id : formData.player2.id;
    }

    /**
     * Calculates points for a game based on score
     */
    private calculatePoints(
        score: number,
        opponentScore: number,
        deuceNumber: number,
        isTiebreak: boolean
    ): number {
        if (isTiebreak) return score;

        let points = 0;
        switch (score) {
            case 15: points = 1; break;
            case 30: points = 2; break;
            case 40: points = opponentScore === 50 ? 3 : 4; break;
            case 50: points = 5; break;
            default: points = 0;
        }

        if (deuceNumber > 1) {
            points += deuceNumber - 1;
        }

        return points;
    }

    /**
     * Updates the match winner based on set scores
     */
    private async updateMatchWinner(
        matchId: number,
        matchScore: { score1: number; score2: number },
        formData: MatchFormData,
        matchSubmit: MatchSubmit
    ): Promise<void> {
        const winner = matchScore.score1 > matchScore.score2
            ? formData.player1.id
            : matchScore.score1 < matchScore.score2
                ? formData.player2.id
                : null;

        if (winner !== null) {
            await matchService.updateWinner(matchId, winner);
        }
    }
}

// Export singleton instance
export const matchCreationService = new MatchCreationService();
