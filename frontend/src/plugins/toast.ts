import { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

export const options: PluginOptions = {
  maxToasts: 3,
  closeOnClick: true,
  draggable: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  timeout: 3000,
}
