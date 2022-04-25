import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';

import router from './router'

let app = createApp(App);
app.use(router);
app.use(SimpleTypeahead);
app.mount('#app');

//createApp(App).use(router).mount('#app')

