import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

import VueSnap from 'vue-snap';
import 'vue-snap/dist/vue-snap.css';

import router from './router';

const app = createApp(App);

app.use(router).use(VueSnap);
app.mount('#app');
