import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {installRouter} from './router'
import App from './App.vue'
const app = createApp(App)
const pinia = createPinia();
app.use(pinia);
installRouter(app);

app.mount('#app')
