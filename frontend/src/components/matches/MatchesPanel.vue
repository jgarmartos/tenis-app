<template>
    <Panel toggleable class="panel">
        <template #header>
            <div class="title">
                <i class="pi pi-user" />
                <span class="font-bold">Últimos partidos</span>
            </div>
        </template>
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

.title {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px;

}



</style>

<script setup lang="ts">

</script>