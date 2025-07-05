<script setup lang="ts">
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';
import { computed, ref } from 'vue';
import AddCompetitionDialog from './AddCompetitionDialog.vue';

const visible = ref(false);

const setVisible = (value: boolean) => {
  visible.value = value;
};

const { competitionsQuery } = useInitialData();

const competitions = computed(() => useDataStore().competitions);

const lastCompetitions = computed(() => {
  return competitions.value?.slice(-3).reverse() || [];
});

const columns = [{ field: 'name', sortable: true }];
</script>

<template>
  <Panel class="panel">
    <template #header>
      <div class="title">
        <i class="pi pi-user" />
        <span class="font-bold">Últimas competiciones</span>
        <div class="right-side">
          <Button @click="visible = true">
            <v-icon name="fa-trophy" fill="white" scale="1" />
          </Button>
        </div>
      </div>
    </template>
    <AddCompetitionDialog
      v-bind:visible="visible"
      :setVisible="setVisible"
      :retry="competitionsQuery.refetch"
    />
    <DataTable
      :value="lastCompetitions"
      size="small"
      :loading="competitionsQuery.isFetching.value"
    >
      <Column v-for="col in columns" :field="col.field" />
    </DataTable>
  </Panel>
</template>

<style scoped>
.panel {
  border-radius: 10px;
  /* overflow: hidden; */
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
  /* max-width: 33%; */
  min-width: 25%;
  min-height: 60%;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px;
  width: 100%;
}

.right-side {
  margin-left: auto;
}
</style>
