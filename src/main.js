import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import { config } from "./helpers/firebaseConfig";

Vue.config.productionTip = false;

firebase.initializeApp(config);

new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
}).$mount("#app");
