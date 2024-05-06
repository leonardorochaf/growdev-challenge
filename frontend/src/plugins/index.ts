/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import Toast from 'vue-toastification'
import vuetify from './vuetify'
import router from '../router'
import { options } from './toast'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(Toast, options)
}
