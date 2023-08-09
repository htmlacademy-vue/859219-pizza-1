import Vue from "vue";
import Vuex from "vuex";

import VuexPlugins from "../plugins/vuex";

import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {
    init({ dispatch }) {
      dispatch("Builder/fetchSourceDough");
      dispatch("Builder/fetchSourceIngredients");
      dispatch("Builder/fetchSourceSauces");
      dispatch("Builder/fetchSourceSizes");
      dispatch("Cart/fetchSourceAdditions");
    },
  },
  modules,
  plugins: [VuexPlugins],
});
