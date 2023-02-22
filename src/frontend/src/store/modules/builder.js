import pizza from "../../static/pizza.json";

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
      dough: null,
      size: null,
      sauce: null,
      ingredients: [],
      name: "",
    },
  },
  getters: {
    pizzaCost(state) {
      const ingredientsCost = state.pizza.ingredients.reduce((sum, item) => {
        return sum + (item?.value ?? 1) * item.price;
      }, 0);

      return (
        state.pizza.size.multiplier *
        (state.pizza.dough.price + state.pizza.sauce.price + ingredientsCost)
      );
    },
  },
  mutations: {
    setSource(state, payload) {
      state.source = payload;
    },
    setInitialPizza(state, payload) {
      state.pizza.dough = payload.dough[0];
      state.pizza.size = payload.sizes[0];
      state.pizza.sauce = payload.sauces[0];
    },
    setCartPizza(state, payload) {
      state.pizza.id = payload.id;
      state.pizza.dough = payload.dough;
      state.pizza.size = payload.size;
      state.pizza.sauce = payload.sauce;
      state.pizza.ingredients = payload.ingredients;
      state.pizza.name = payload.name;
      state.pizza.value = payload.value;
    },
    resetPizza(state) {
      delete state.pizza.id;
      state.pizza.dough = state.source.dough[0];
      state.pizza.size = state.source.sizes[0];
      state.pizza.sauce = state.source.sauces[0];
      state.pizza.ingredients = [];
      state.pizza.name = "";
      delete state.pizza.value;
    },
    changePizzaDough(state, id) {
      state.pizza.dough = {
        ...state.source.dough.find((item) => item.id === +id),
      };
    },
    changePizzaSize(state, id) {
      state.pizza.size = {
        ...state.source.sizes.find((item) => item.id === +id),
      };
    },
    changePizzaSauce(state, id) {
      state.pizza.sauce = {
        ...state.source.sauces.find((item) => item.id === +id),
      };
    },
    changePizzaIngredients(state, { id, value }) {
      const itemIndex = state.pizza.ingredients.findIndex(
        (item) => item.id === id
      );

      if (~itemIndex) {
        const item = state.pizza.ingredients[itemIndex];
        const itemValue = item.value + value;

        if (itemValue) {
          item.value = itemValue;
        } else {
          state.pizza.ingredients.splice(itemIndex, 1);
        }
      } else {
        state.pizza.ingredients.push({
          ...(state.source.ingredients.find((item) => item.id === id) || []),
          value,
        });
      }
    },
    changePizzaName(state, value) {
      state.pizza.name = value;
    },
  },
  actions: {
    fetchSourceItems({ commit }) {
      const response = pizza;

      commit("setSource", response);
      commit("setInitialPizza", response);
    },
  },
};
