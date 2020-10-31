import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importing the Nova Light PrimeVue theme styles
import 'primevue/resources/themes/saga-blue/theme.css';

// Importing the base PrimeVue component styles
import 'primevue/resources/primevue.min.css';

// Importing the base PrimeIcon styles
import 'primeicons/primeicons.css';

// Importing PrimeFlex (grid system, flexbox, spacing, elevation and more)
import 'primeflex/primeflex.css';

createApp(App).use(router).mount('#app')
