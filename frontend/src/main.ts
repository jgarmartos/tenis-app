import './assets/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { VueQueryPlugin } from '@tanstack/vue-query';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataView from 'primevue/dataview';
import Panel from 'primevue/panel';
import PickList from 'primevue/picklist';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import Calendar from 'primevue/calendar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import RadioButton from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';
import FloatLabel from 'primevue/floatlabel';
import Listbox from 'primevue/listbox';
import Row from 'primevue/row';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Knob from 'primevue/knob';
import Divider from 'primevue/divider';
import MeterGroup from 'primevue/metergroup';
import AvatarGroup from 'primevue/avatargroup'; //Optional for grouping
import Menubar from 'primevue/menubar';
import SelectButton from 'primevue/selectbutton';
import Fieldset from 'primevue/fieldset';

import {
  FaFlag,
  RiZhihuFill,
  GiTennisBall,
  FaUsers,
  HiSolidSearch,
  FaTrophy,
  GiTennisCourt,
  HiSolidPlusSm,
  HiSolidMinusSm,
  MdPlaceOutlined,
  FaHome,
  BiX,
  BiXOctagonFill,
} from 'oh-vue-icons/icons';

addIcons(
  FaFlag,
  RiZhihuFill,
  GiTennisBall,
  FaUsers,
  FaTrophy,
  HiSolidSearch,
  GiTennisCourt,
  HiSolidPlusSm,
  HiSolidMinusSm,
  MdPlaceOutlined,
  FaHome,
  BiX,
  BiXOctagonFill
);

import 'primevue/resources/themes/aura-dark-blue/theme.css';

import Ripple from 'primevue/ripple';

const app = createApp(App);

app.directive('ripple', Ripple);

app.use(PrimeVue, { ripple: true });
app.use(VueQueryPlugin);
app.use(createPinia());
app.use(router);

app.component('Button', Button);
app.component('DataView', DataView);
app.component('Panel', Panel);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('Dialog', Dialog);
app.component('Listbox', Listbox);
app.component('Stepper', Stepper);
app.component('StepperPanel', StepperPanel);
app.component('InputText', InputText);
app.component('PickList', PickList);
app.component('Avatar', Avatar);
app.component('VIcon', OhVueIcon);
app.component('Knob', Knob);
app.component('InputNumber', InputNumber);
app.component('DataTable', DataTable);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('RadioButton', RadioButton);
app.component('Column', Column);
app.component('AvatarGroup', AvatarGroup);
app.component('FloatLabel', FloatLabel);
app.component('Row', Row);
app.component('Fieldset', Fieldset);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Divider', Divider);
app.component('MeterGroup', MeterGroup);
app.component('Menubar', Menubar);
app.component('SelectButton', SelectButton);

app.mount('#app');
