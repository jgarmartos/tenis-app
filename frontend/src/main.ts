import './assets/main.css' 
import "primeicons/primeicons.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Button from "primevue/button"
import DataView from 'primevue/dataview';
import Panel from 'primevue/panel';
import PickList from 'primevue/picklist';
import Avatar from 'primevue/avatar';
import { OhVueIcon, addIcons } from "oh-vue-icons";

import { FaFlag, RiZhihuFill, GiTennisBall, FaUsers, BiTrophy, BiSearch, HiSolidSearch, FaTrophy } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, GiTennisBall, FaUsers, FaTrophy, HiSolidSearch );

import 'primevue/resources/themes/aura-light-green/theme.css'

// import Noir from './assets/presets/Noir';

const app = createApp(App);

app.use(PrimeVue)

app.use(createPinia())
app.use(router)
app.component('Button', Button) 
app.component('DataView', DataView) 
app.component('Panel', Panel) 
app.component('PickList', PickList) 
app.component('Avatar', Avatar) 
app.component('v-icon', OhVueIcon) 



app.mount('#app')
