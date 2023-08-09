import Vuex from "vuex";

import VuexPlugins from "../../plugins/vuex";

import Auth from "../modules/auth";
import Builder from "../modules/builder";
import Cart from "../modules/cart";
import Notifier from "../modules/notifier";
import Orders from "../modules/orders";

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
