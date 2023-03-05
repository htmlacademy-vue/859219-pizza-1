import Vue from "vue";

import { createResources } from "../common/helpers";
import Notifier from "../plugins/notifier";
import JwtService from "../services/jwt";
import store from "../store";

Vue.use({
  install(Vue) {
    Vue.mixin({
      computed: {
        $notifier: () => new Notifier(store),
        $api: () => createResources(this.$notifier),
        $jwt: () => JwtService,
      },
    });
  },
});
