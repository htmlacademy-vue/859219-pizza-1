import Vue from "vue";

export default {
  namespaced: true,
  state: {
    source: {
      dough: [],
      sizes: [],
      sauces: [],
      ingredients: [],
    },
    pizza: {
      dough: {},
      size: {},
      sauce: {},
      ingredients: [],
      name: "",
    },
  },
  getters: {
    normalizedSourceSizes(state) {
      return state.source.sizes.sort((item1, item2) =>
        item2.multiplier < item1.multiplier ? 1 : -1
      );
    },
    pizzaCost(state) {
      const ingredientsCost = state.pizza.ingredients.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);

      return (
        state.pizza.size.multiplier *
        (state.pizza.dough.price + state.pizza.sauce.price + ingredientsCost)
      );
    },
  },
  mutations: {
    setSourceDough(state, payload) {
      state.source.dough = payload;
      state.pizza.dough = payload[0];
    },
    setSourceIngredients(state, payload) {
      state.source.ingredients = payload;
    },
    setSourceSauces(state, payload) {
      state.source.sauces = payload;
      state.pizza.sauce = payload[0];
    },
    setSourceSizes(state, payload) {
      state.source.sizes = payload;
      state.pizza.size = payload.find((item) => item.multiplier === 1);
    },
    setCartPizza(state, payload) {
      Vue.set(state.pizza, "id", payload.id);
      state.pizza.dough = payload.dough;
      state.pizza.size = payload.size;
      state.pizza.sauce = payload.sauce;
      state.pizza.ingredients = payload.ingredients;
      state.pizza.name = payload.name;
      Vue.set(state.pizza, "count", payload.count);
    },
    resetPizza(state) {
      Vue.delete(state.pizza, "id");
      state.pizza.dough = state.source.dough[0];
      state.pizza.size = state.source.sizes[0];
      state.pizza.sauce = state.source.sauces[0];
      state.pizza.ingredients = [];
      state.pizza.name = "";
      Vue.delete(state.pizza, "count");
    },
    changePizzaDough(state, id) {
      state.pizza.dough = state.source.dough.find((item) => item.id === +id);
    },
    changePizzaSize(state, id) {
      state.pizza.size = state.source.sizes.find((item) => item.id === +id);
    },
    changePizzaSauce(state, id) {
      state.pizza.sauce = state.source.sauces.find((item) => item.id === +id);
    },
    changePizzaIngredients(state, { id, value }) {
      const itemIndex = state.pizza.ingredients.findIndex(
        (item) => item.id === id
      );

      if (~itemIndex) {
        const item = state.pizza.ingredients[itemIndex];
        const itemCount = item.count + value;

        if (itemCount) {
          item.count = itemCount;
        } else {
          state.pizza.ingredients.splice(itemIndex, 1);
        }
      } else {
        state.pizza.ingredients.push({
          ...state.source.ingredients.find((item) => item.id === id),
          count: value,
        });
      }
    },
    changePizzaName(state, value) {
      state.pizza.name = value;
    },
  },
  actions: {
    async fetchSourceDough({ commit }) {
      try {
        const dough = await this.$api.dough.query();
        commit("setSourceDough", dough);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSourceIngredients({ commit }) {
      try {
        const ingredients = await this.$api.ingredients.query();
        commit("setSourceIngredients", ingredients);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSourceSizes({ commit }) {
      try {
        const sizes = await this.$api.sizes.query();
        commit("setSourceSizes", sizes);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSourceSauces({ commit }) {
      try {
        const sauces = await this.$api.sauces.query();
        commit("setSourceSauces", sauces);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
