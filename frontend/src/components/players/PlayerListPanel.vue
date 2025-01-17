<script setup lang="ts">
import { useDataStore } from '@/stores/useDataStore';
import { ref, computed } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useInitialData } from '@/services/requests/useInitialData';
import router from '@/router';
// import { CustomerService } from '@/service/CustomerService';

// const customers = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

useInitialData();

const players = computed(() => useDataStore().players);

const loading = ref(true);

// onMounted(() => {
//     CustomerService.getCustomersMedium().then((data) => {
//             customers.value = getCustomers(data);
//             loading.value = false;
//         });
// });
/**
 * @description Handle the row select event
 * @param event {Event} Event
 */
 const onRowSelect = (event: any) => {
    router.push({
        name: 'playerInfo',
        params: {
            id: event.data.id
        }
    });
};
</script>


<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="players" paginator :rows="10" dataKey="id" filterDisplay="row" @rowSelect="onRowSelect"
             :globalFilter="filters['global'].value" :sortMode="'multiple'" :sortOrder="1" selection-mode="single">
            <template #header>
                <div style="display: flex; justify-content: end;">
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

<style scoped></style>