import Vue from "vue";

import "./plugins/ui";
import "./plugins/vue";
import store from "./store";
import App from "./App";

Vue.config.productionTip = false;

const init = async () => {
  const module = await import("./router");
  const router = await module.default;
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
};

init();
