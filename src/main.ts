import { createSSRApp } from 'vue';
import './styles/index.scss'

import App from "./App.vue";

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

export function createApp() {

    const app = createSSRApp(App);

    app.use(pinia)

    return {
		app,
    };
    
}
