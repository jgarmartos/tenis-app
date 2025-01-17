<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue';
import PlayerListPanel from '@/components/players/PlayerListPanel.vue';


</script>

<template>
    <header>
        <MenuBar />
    </header>

    <body>
        <div class="panels-container">
            <Panel class="panel">
                <PlayerListPanel />
            </Panel>
        </div>
    </body>
</template>

<style scoped>
header {
    line-height: 2;
    max-height: 20vh;
}

.panel {
  border-radius: 10px;
  /* overflow: hidden; */
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
  /* max-width: 50%; */
  /* min-width: 33%; */
  width: 100%;
}

.panels-container {
  padding-top: 1%;
  display: flex !important;
  width: 100%;
  height: 100%;
}
</style>
