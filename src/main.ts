import { createApp } from "vue";
import VueMobileDetection from "vue-mobile-detection";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";

createApp(App).use(store).use(router).use(VueMobileDetection).mount("#app");
