<template>
  <div class="progress-bar-container">
    <div class="progress-labels">
      <span>{{ value1 }}</span>
      <span style="font-weight: bold">{{ title }}</span>
      <span>{{ value2 }}</span>
    </div>
    <div class="progress-bar">
      <div
        class="progress"
        :style="{
          width: `${percentage1}%`,
          backgroundColor: 'var(--blue-color)',
        }"
      ></div>
      <!-- <Divider layout="vertical" /> -->
      <div
        class="progress"
        :style="{
          width: `${percentage2}%`,
          backgroundColor: 'var(--green-color)',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  value1: number;
  value2: number;
  title: string;
}>();

const total = computed(() => props.value1 + props.value2);
const percentage1 = computed(() => (props.value1 / total.value) * 100);
const percentage2 = computed(() => (props.value2 / total.value) * 100);
</script>

<style scoped>
.progress-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-family: Arial, sans-serif;
  gap: 0.5rem;
}

.progress-bar {
  display: flex;
  width: 200px;
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  /* gap: 1rem; */
}

.progress {
  height: 100%;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
}
</style>
