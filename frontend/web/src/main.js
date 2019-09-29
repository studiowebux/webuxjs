import Vue from "vue";
import App from "./App.vue";
import "./resources/cookies";
import router from "./router";
import store from "./store";
import "./resources/socket";
import "./registerServiceWorker";
import "./resources/font-awesome";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue-simple-suggest/dist/styles.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
