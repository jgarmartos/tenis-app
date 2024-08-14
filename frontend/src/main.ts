import './assets/main.css' 
import "primeicons/primeicons.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { VueQueryPlugin } from '@tanstack/vue-query';

import PrimeVue from 'primevue/config'
import Button from "primevue/button"
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataView from 'primevue/dataview';
import Panel from 'primevue/panel';
import PickList from 'primevue/picklist';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';   //Optional for grouping


import { FaFlag, RiZhihuFill, GiTennisBall, FaUsers, HiSolidSearch, FaTrophy } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, GiTennisBall, FaUsers, FaTrophy, HiSolidSearch );

import 'primevue/resources/themes/aura-light-green/theme.css'

// import Noir from './assets/presets/Noir';

const app = createApp(App);

app.use(PrimeVue)
app.use(VueQueryPlugin)

app.use(createPinia())
app.use(router)
app.component('Button', Button) 
app.component('DataView', DataView) 
app.component('Panel', Panel) 
app.component('Dropdown', Dropdown)
app.component('Dialog', Dialog)
app.component('InputText', InputText)
app.component('PickList', PickList) 
app.component('Avatar', Avatar) 
app.component('v-icon', OhVueIcon) 
app.component('DataTable', DataTable) 
app.component('Column', Column) 
app.component('AvatarGroup', AvatarGroup) 






app.mount('#app')
