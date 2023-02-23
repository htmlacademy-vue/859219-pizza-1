import Vue from "vue";

import { createResources } from "../common/helpers";
import Notifier from "../plugins/notifier";
import JwtService from "../services/jwt";

Vue.use({
  install(Vue) {
    Vue.mixin({
      computed: {
        $api: () => createResources(this.$notifier),
        $jwt: () => JwtService,
        $notifier: () => new Notifier(this.$store),
      },
    });
  },
});
