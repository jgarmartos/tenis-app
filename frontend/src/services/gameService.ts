import { computed } from 'vue';
// import { useGetData } from "./requests/getData";
import { useDataStore } from '@/stores/useDataStore';

const getGamesBySet = (setId: number) => {
  const games = computed(() => useDataStore().games);
  const filteredGames = games.value.filter(
    (game: any) => game.set.id === setId
  );
  const sortedGames = filteredGames.sort(
    (a: any, b: any) => a.gameNumber - b.gameNumber
  ); // Add type annotation for the 'set' parameter
  return sortedGames;
};

export { getGamesBySet };
