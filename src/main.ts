import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { registerSW } from 'virtual:pwa-register'


function showUpdatePrompt(updateFn: () => void) {
  const confirmed = window.confirm("¡Hay una nueva versión disponible! ¿Actualizar ahora?")
  if (confirmed) updateFn()
}

const updateSW = registerSW({
  onNeedRefresh() {
    // Mostrar mensaje al usuario para actualizar
    showUpdatePrompt(() => {
      updateSW(true) // fuerza la actualización
    })
  },
  onOfflineReady() {
       // Toast o banner visual
    window.alert("La app ya está lista para funcionar sin conexión.")
  }
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(PrimeVue, { theme: { preset: Aura }});
app.mount('#app');