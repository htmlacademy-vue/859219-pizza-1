import Vuex from "vuex";

import VuexPlugins from "../../plugins/vuex";

import Auth from "../modules/auth/store";
import Builder from "../modules/builder/store";
import Cart from "../modules/cart/store";
import Notifier from "../modules/notifier/store";
import Orders from "../modules/orders/store";

export const createMockStore = (actions) => {
  const modules = {
    Auth,
    Builder,
    Cart,
    Notifier,
    Orders,
  };

  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modules[module] = { ...modules[module], actions };
    });
  }

  return new Vuex.Store({
    modules,
    plugins: [VuexPlugins],
  });
};
