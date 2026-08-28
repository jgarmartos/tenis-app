/** * PlayerListPanel.vue * * Displays a searchable and sortable list of players
with basic statistics. * Allows navigation to a player's profile on row
selection. * * @module components/players/PlayerListPanel */

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useAppData } from '@/services/core/useAppData';
import router from '@/router';

/**
 * Filters for the DataTable, including global and name filters.
 */
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

/**
 * Modern data loading with loading states
 */
const { players, isLoading } = useAppData();

/**
 * Loading state for the table (not currently used).
 */
const loading = ref(true);

// onMounted(() => {
//     CustomerService.getCustomersMedium().then((data) => {
//             customers.value = getCustomers(data);
//             loading.value = false;
//         });
// });
/**
 * Handles row selection event and navigates to the player's profile page.
 * @param {any} event - Row select event
 */
const onRowSelect = (event: any) => {
  router.push({
    name: 'playerInfo',
    params: {
      id: event.data.id,
    },
  });
};
</script>

<template>
  <!--
      Card containing a DataTable with player information and filters.
      Allows searching, sorting, and navigation to player profiles.
    -->
  <div class="card">
    <DataTable v-model:filters="filters" :value="players" paginator :rows="10" dataKey="id" filterDisplay="row"
      @rowSelect="onRowSelect" :globalFilter="filters['global'].value" :sortMode="'multiple'" :sortOrder="1"
      selection-mode="single">
      <template #header>
        <div style="display: flex; justify-content: end">
          <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          <i class="pi pi-search" style="margin: 4px 4px 0 0"></i>
        </div>
      </template>
      <Column field="name" header="Nombre" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
      </Column>
      <Column header="Mano preferida" filterField="forehand" style="min-width: 12rem">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span>{{ data.forehand }}</span>
          </div>
        </template>
      </Column>
      <Column header="Nº partidos" filterField="number-of-matches" style="min-width: 14rem" sortable>
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span> {{ data.playerStatistics.matchesPlayed }} </span>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
/* Add custom styles for the player list panel here if needed */
</style>
