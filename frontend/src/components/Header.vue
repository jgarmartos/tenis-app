<script setup lang="ts">
import { ref } from "vue";

const headerCategories = ref([
  {
    title: 'Jugadores',
    icon: 'fa-users',
    animation: '',
  },
  {
    title: 'Partidos',
    icon: 'gi-tennis-ball',
    animation: 'float',
  },
  {
    title: 'Competiciones',
    icon: 'fa-trophy',
    animation: '',
  },
  {
    title: 'Búsqueda',
    icon: 'hi-solid-search',
    animation: 'pulse'
  }
]);
</script>

<template>
    <body>
    <div class="header">
      <div class="block"></div>
      <div class="navigation-pill-list">
        <Button v-for="category in headerCategories" class="navigation-pill">
          <v-icon :name="category.icon" :animation="category.animation" fill="white" />
          <span class="title">{{ category.title }}</span>
        </Button>
        
      </div>

      <div>
        <img src="@/assets/tennis-court-game-field-grass-512.webp" alt="logo" style="width: 80px; height: 80px;" />
      </div>

      <div class="header-auth">
        <Button label="Sign In" icon="pi pi-arrow-right" class="sign-in-button" />
        <Button label="Register" icon="pi pi-user-plus"  class="register-button" />
      </div>
    </div>
  </body>
  
</template>

<style scoped>
.sign-in-button{
  background-color: grey;
  border-color: grey;
}

.register-button{
  background-color: rgb(71, 71, 71);
  border-color: rgb(71, 71, 71);
}

.header {
  display: flex;
  width: 100%;
  height: 98px;
  align-items: center;
  gap: 24px;
  padding: 32px;
  position: relative;
  background-color: #ffffff;
  border-radius: 100px;
  overflow: hidden;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #d9d9d9;
}

.header .block {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  position: relative;
  flex: 0 0 auto;
  margin-top: -0.5px;
  margin-bottom: -0.5px;
}

.header .navigation-pill-list {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  flex: 1;
  flex-grow: 1;
  background-color: #ffffff;
  justify-content: left;
  position: relative;
}

.header .navigation-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  /* padding: 8px; */
  position: relative;
  flex: 0 0 auto;
  border-radius: 8px;
}

.header .title {
  position: relative;
  width: fit-content;
  margin-top: -1px;
  gap: 8px;
  font-family: var(--single-line-body-base-font-family);
  font-weight: var(--single-line-body-base-font-weight);
  color: white;
  font-size: var(--single-line-body-base-font-size);
  letter-spacing: var(--single-line-body-base-letter-spacing);
  line-height: var(--single-line-body-base-line-height);
  white-space: nowrap;
  font-style: var(--single-line-body-base-font-style);
}

.header .title-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  flex: 0 0 auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  justify-content: center;
  position: relative;
}

.header .span-wrapper {
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #1e1e1e;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 16px;
  white-space: nowrap;
}

.header .text-wrapper {
  font-family: var(--single-line-body-base-font-family);
  font-weight: var(--single-line-body-base-font-weight);
  color: #1e1e1e;
  font-size: var(--single-line-body-base-font-size);
  letter-spacing: var(--single-line-body-base-letter-spacing);
  line-height: var(--single-line-body-base-line-height);
  font-style: var(--single-line-body-base-font-style);
}

.header .header-auth {
  display: flex;
  /* width: 178px; */
  align-items: center;
  gap: 12px;
  position: relative;
}

.header .button {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  position: relative;
  flex: 1;
  flex-grow: 1;
  background-color: #e3e3e3;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid;
  border-color: #767676;
}

.header .div {
  all: unset;
  box-sizing: border-box;
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: var(--single-line-body-base-font-family);
  font-weight: var(--single-line-body-base-font-weight);
  color: #1e1e1e;
  font-size: var(--single-line-body-base-font-size);
  letter-spacing: var(--single-line-body-base-letter-spacing);
  line-height: var(--single-line-body-base-line-height);
  white-space: nowrap;
  font-style: var(--single-line-body-base-font-style);
}


</style>