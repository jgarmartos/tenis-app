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
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import Calendar from 'primevue/calendar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import RadioButton from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';

import Listbox from 'primevue/listbox';

import AvatarGroup from 'primevue/avatargroup';   //Optional for grouping


import { FaFlag, RiZhihuFill, GiTennisBall, FaUsers, HiSolidSearch, FaTrophy, GiTennisCourt, HiSolidPlusSm, HiSolidMinusSm } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, GiTennisBall, FaUsers, FaTrophy, HiSolidSearch, GiTennisCourt, HiSolidPlusSm, HiSolidMinusSm);

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
app.component('Calendar', Calendar)
app.component('Dropdown', Dropdown)
app.component('Dialog', Dialog)
app.component('Listbox', Listbox)
app.component('Stepper', Stepper)
app.component('StepperPanel', StepperPanel)
app.component('InputText', InputText)
app.component('PickList', PickList) 
app.component('Avatar', Avatar) 
app.component('v-icon', OhVueIcon) 
app.component('InputNumber', InputNumber)
app.component('DataTable', DataTable) 
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('RadioButton', RadioButton)
app.component('Column', Column) 
app.component('AvatarGroup', AvatarGroup) 






app.mount('#app')
