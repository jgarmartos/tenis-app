

import { useDataStore } from '@/stores/useDataStore';
import { computed } from 'vue'; // Import the 'computed' function from the 'vue' package

const getSetsForMatch = (matchId: number) => { // Add arrow function syntax and specify the return type
    const sets = computed(() => useDataStore().sets);
    const filteredSets = sets.value.filter((set: any) => set.match.id === matchId); // Add type annotation for the 'set' parameter
    const sortedSets = filteredSets.sort((a: any, b: any) => a.numberSet - b.numberSet); // Add type annotations for the 'a' and 'b' parameters
    return sortedSets.map((set: any) => `${set.player1Score}-${set.player2Score}`).join(', '); // Add type annotation for the 'set' parameter
};

const getSetsForMatchByPlayer = (matchId: number, playerId: number) => { // Add arrow function syntax and specify the return type
    const sets = computed(() => useDataStore().sets);
    const filteredSets = sets.value.filter((set: any) => set.match.id === matchId); // Add type annotation for the 'set' parameter
    const sortedSets = filteredSets.sort((a: any, b: any) => a.numberSet - b.numberSet); // Add type annotations for the 'a' and 'b' parameters
    return sortedSets.map((set: any) => {
       if (set.match.player1.id === playerId && set.player1Score > set.player2Score) {
              return {
                score: set.player1Score,
                isWinner: true
              }
         } else if (set.match.player2.id === playerId && set.player2Score > set.player1Score) {
              return {
                score: set.player2Score,
                isWinner: true
              }
         } else if (set.match.player1.id === playerId && set.player1Score < set.player2Score) {
              return {
                score: set.player1Score,
                isWinner: false
              }
         } else if (set.match.player2.id === playerId && set.player2Score < set.player1Score) {
                return {
                    score: set.player2Score,
                    isWinner: false
                }
            }
    })// Add type annotation for the 'set' parameter
}

export { getSetsForMatch, getSetsForMatchByPlayer }; // Export the 'getSetsForMatch' function