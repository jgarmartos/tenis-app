<script setup lang="ts">
/**
 * PlayerInfoDialog.vue
 *
 * Read-only dialog showing a player's key statistics and recent matches.
 * Mirrors the layout/behaviour of PlaceInfoDialog.vue (header field, stats
 * section, matches section with loading/empty states).
 *
 * @module components/players/PlayerInfoDialog
 */
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useAppData } from '@/services/core/useAppData';
import PlayerMatchesTableComponent from './PlayerMatchesTableComponent.vue';

const store = usePlayerStore();

/**
 * i18n composable for accessing translation functions.
 */
const { t } = useI18n();

/**
 * App data composable, used only to know whether the player already has
 * matches recorded (the actual table is rendered by PlayerMatchesTableComponent).
 */
const { matches, isLoading } = useAppData();

/**
 * The player currently shown in the dialog, if any.
 */
const player = computed(() => store.playerToShow);

/**
 * The player's aggregated statistics, if available.
 */
const stats = computed(() => player.value?.playerStatistics ?? null);

/**
 * Whether the player has at least one match recorded.
 */
const hasMatches = computed(() => {
  if (!player.value) return false;
  return matches.value.some(
    match => match.player1.id === player.value!.id || match.player2.id === player.value!.id
  );
});

/**
 * Compact stat cards shown at the top of the dialog.
 */
const statCards = computed(() => {
  if (!stats.value) return [];
  return [
    { label: t('players.infoDialog.stats.matchesPlayed'), value: stats.value.matchesPlayed },
    { label: t('players.infoDialog.stats.matchesWon'), value: stats.value.matchesWon },
    { label: t('players.infoDialog.stats.winPercentage'), value: `${stats.value.winPercentage}%` },
    { label: t('players.infoDialog.stats.setsWon'), value: stats.value.setsWon },
    { label: t('players.infoDialog.stats.gamesWon'), value: stats.value.gamesWon },
    { label: t('players.infoDialog.stats.pointsWinPercentage'), value: `${stats.value.pointsWinPercentage}%` },
  ];
});
</script>

<template>
  <Dialog v-model:visible="store.isInfoVisible" modal :header="player?.name" :style="{ width: '42rem' }"
    @hide="store.hidePlayerInfo()">
    <div v-if="player" class="player-header">
      <Avatar :label="player.name.charAt(0).toUpperCase()" size="xlarge" shape="circle" class="player-avatar" />
      <div class="player-header-info">
        <span class="player-name">{{ player.name }}</span>
        <span class="player-subtitle">
          {{ t('players.infoDialog.fields.forehand') }}: {{ player.forehand }}
        </span>
      </div>
    </div>

    <!-- Stats section -->
    <div v-if="stats" class="stats-section">
      <h3 class="section-title">{{ t('players.infoDialog.stats.title') }}</h3>
      <div class="stats-grid">
        <div v-for="card in statCards" :key="card.label" class="stat-card">
          <span class="stat-value">{{ card.value }}</span>
          <span class="stat-label">{{ card.label }}</span>
        </div>
      </div>
    </div>

    <!-- Matches section -->
    <div class="matches-section">
      <h3 class="section-title">{{ t('players.infoDialog.matches.title') }}</h3>

      <!-- Loading state -->
      <div v-if="isLoading" class="loading-state">
        <ProgressSpinner />
        <span class="loading-text">{{ t('common.loading') }}</span>
      </div>

      <!-- Matches table -->
      <PlayerMatchesTableComponent v-else-if="player && hasMatches" :playerId="String(player.id)" />

      <!-- Empty state -->
      <div v-else class="empty-state">
        <i class="pi pi-info-circle empty-icon"></i>
        <p class="empty-text">{{ t('players.infoDialog.matches.empty') }}</p>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.player-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.player-header-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.player-name {
  font-size: 1.1rem;
  font-weight: 700;
}

.player-subtitle {
  font-size: 0.85rem;
  color: #666;
}

.section-title {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.stats-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
}

.stat-label {
  font-size: 0.75rem;
  color: #666;
  text-align: center;
}

.matches-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  justify-content: center;
}

.loading-text {
  font-size: 0.9rem;
  color: #666;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  text-align: center;
}

.empty-icon {
  font-size: 2rem;
  color: #ccc;
}

.empty-text {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
