<script setup lang="ts">
import { computed, ref } from "vue";
import getInitialData from "@/services/getInitialData";
import type { Player, PlayerSubmit } from "@/interfaces/PlayerInterfaces";
import saveData from "@/services/saveData";
import api from "@/api/api";
import { useQuery } from "@tanstack/vue-query";

const initialData = async () =>
  await api.get<Player[]>('/players');
  

const { isPending, isError, isFetching, data, error, refetch } = useQuery({
  queryKey: ['posts'],
  queryFn: initialData,
})

const lastFivePlayers = computed(() => {
  return data.value?.data.slice(-5).reverse() || [];
});


const columns = [
  { field: "name", sortable: true },
  { field: "forehand", sortable: true },
];

const preferedHand = [
  { name: "Derecha", code: "D" },
  { name: "Izquierda", code: "I" },
];

const selectedHand = ref({ name: "", code: "" });

const savePlayer = () => {
  visible.value = false;
  player.value.forehand = selectedHand.value.name;
  console.log(player.value);
  saveData.savePlayer(player.value).then((response) => {
    retry();
  });
};

const player = ref<PlayerSubmit>({
  name: "",
  forehand: "",
});

const retry = () => {
  refetch();
  console.log(data)

};

const visible = ref(false);
</script>

<template>
  <Panel class="panel">
    <template #header>
      <div class="title">
        <i class="pi pi-user" />
        <span class="font-bold">Últimos jugadores</span>
        <div class="right-side">
          <Button @click="visible = true">
            <i class="pi pi-user-plus" />
          </Button>
        </div>
      </div>
    </template>
    <Dialog
      v-model:visible="visible"
      modal
      header="Edit Profile"
      :style="{ width: '25rem' }">
      <template #header>
        <div class="inline-flex align-items-center justify-content-center gap-2">
          <span class="font-bold white-space-nowrap">Crear jugador</span>
        </div>
      </template>
      <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
      <div class="add-player-line">
        <label for="username" class="font-semibold w-6rem">Nombre</label>
        <InputText v-model="player.name" id="username" class="flex-auto w-1rem" autocomplete="off" />
      </div>
      <div class="add-player-line">
        <label for="email" class="font-semibold w-6rem">Mano preferida</label>
        <Dropdown v-model="selectedHand" :options="preferedHand" optionLabel="name" placeholder="" class="w-full md:w-8rem" /> 
        
      </div>
      <template #footer>
        <Button label="Cancel" text severity="secondary"
          @click="visible = false" autofocus />
        <Button label="Save" outlined severity="secondary"
          @click="savePlayer" autofocus />
      </template>
    </Dialog>
    <div v-if="isPending" class="p-text-center">
      <ProgressSpinner />
    </div>
    <div v-if="isError" class="p-text-center">
      <span>Error: {{ error?.message }}</span>
      <Button @click="retry">Retry</Button>
    </div>
    <div v-else-if="isFetching" class="p-text-center">
      <ProgressSpinner />
    </div>
    <!-- <div v-else-if="data.value?.data.length === 0" class="p-text-center">
      <span>No data found.</span>
    </div> -->
    <DataTable v-else :value="lastFivePlayers" size="small" :loading="isFetching">
      <Column>
        <template #body="playersResponse">
          <Avatar
            :label="playersResponse.data.name.charAt(0).toUpperCase()"
            class="mr-2"
            size="normal"
          />
        </template>
      </Column>
      <Column v-for="col in columns" :field="col.field" sortable />
    </DataTable>
    <!-- <div v-for="player in playersResponse" class="player-field">
        <p>{{ player.name }}</p>
        <p style="align-content: flex-end;">{{ player.forehand }}</p>
    </div> -->
  </Panel>
</template>

<style scoped>
.panel {
  border-radius: 10px;
  /* overflow: hidden; */
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
  max-width: 33%;
  min-width: 375px;
}

.player-field {
  /* flex-direction: row; */
  display: flex;
  /* align-items: center; */
  gap: 20px;
  padding: 14px;
  font-size: small;
}

.add-player-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  width: 100%;
}

.right-side {
  margin-left: auto;
}
</style>
