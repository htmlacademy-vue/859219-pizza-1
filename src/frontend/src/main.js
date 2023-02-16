import Vue from "vue";

import "./plugins/ui";
import router from "./router";
import store from "./store";
import App from "./App";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
