<script setup lang="ts">
import { useInitialData } from '@/services/requests/useInitialData';
import { useDataStore } from '@/stores/useDataStore';
import { computed, ref } from 'vue';
import AddPlaceDialog from './AddPlaceDialog.vue';


const visible = ref(false);

const setVisible = (value: boolean) => {
    visible.value = value;
};

const { placesQuery } = useInitialData();

const places = computed(() => useDataStore().places);

const lastPlaces = computed(() => {
  return places.value?.slice(-3).reverse() || [];
});

const columns = [
  { field: "name", sortable: true },
  { field: "city", sortable: true },
];
</script>

<template>
    <Panel class="panel">
        <template #header>
            <div class="title">
                <i class="pi pi-user" />
                <span class="font-bold">Últimos lugares</span>
                <div class="right-side">
                    <Button @click="visible = true">
                        <v-icon name="md-place-outlined" fill="white" scale="1" />
                    </Button>
                </div>
            </div>
        </template>
        <AddPlaceDialog v-bind:visible="visible" :setVisible="setVisible" :retry="placesQuery.refetch"/>
        <DataTable :value="lastPlaces" size="small" :loading="placesQuery.isFetching.value">
            <Column v-for="col in columns" :field="col.field" />
        </DataTable>
    </Panel>

</template>

<style scoped>
.panel {
    border-radius: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: #d9d9d9;
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
