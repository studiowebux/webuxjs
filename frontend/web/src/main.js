import Vue from "vue";

import "./resources/socket";
import "./resources/cookies";
import router from "./router";
import store from "./store";

import App from "./App.vue";

import "./registerServiceWorker";
import "./resources/font-awesome";
import "vue-swatches/dist/vue-swatches.min.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue-simple-suggest/dist/styles.css";
import "./assets/_variables.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
