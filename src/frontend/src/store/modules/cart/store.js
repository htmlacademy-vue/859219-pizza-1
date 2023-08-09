export default {
  namespaced: true,
  state: {
    source: {
      additions: [],
    },
    cart: {
      products: [],
      additions: [],
    },
    form: {
      type: "self-delivery",
      tel: "",
      street: "",
      house: "",
      apartment: "",
      comment: "",
    },
  },
  getters: {
    isCartEmpty(state) {
      return !state.cart.products.length;
    },
    totalCost(state) {
      const productsCost = state.cart.products?.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);

      const additionsCost = state.cart.additions?.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);

      return productsCost + additionsCost;
    },
  },
  mutations: {
    setSourceAdditions(state, payload) {
      state.source.additions = payload;
    },
    setCartProduct(state, payload) {
      const itemIndex = state.cart.products.findIndex(
        (item) => item.id === payload.id
      );

      if (~itemIndex) {
        state.cart.products.splice(itemIndex, 1, payload);
      } else {
        state.cart.products.push(payload);
      }
    },
    setCart(state, payload) {
      state.cart.products = payload.products;
      state.cart.additions = payload.additions;
      state.form = payload.address;
    },
    resetCart(state) {
      state.cart.products = [];
      state.cart.additions = [];
      state.form.type = "self-delivery";
      state.form.tel = "";
      state.form.street = "";
      state.form.house = "";
      state.form.apartment = "";
      state.form.comment = "";
    },
    changeCartProducts(state, { id, value }) {
      const itemIndex = state.cart.products.findIndex((item) => item.id === id);
      const item = state.cart.products[itemIndex];
      const itemCount = item.count + value;

      if (itemCount) {
        item.count = itemCount;
      } else {
        state.cart.products.splice(itemIndex, 1);
        state.cart.additions = [];
      }
    },
    changeCartAdditions(state, { id, value }) {
      const itemIndex = state.cart.additions.findIndex(
        (item) => item.id === id
      );

      if (~itemIndex) {
        const item = state.cart.additions[itemIndex];
        const itemCount = item.count + value;

        if (itemCount) {
          item.count = itemCount;
        } else {
          state.cart.additions.splice(itemIndex, 1);
        }
      } else {
        state.cart.additions.push({
          ...state.source.additions.find((item) => item.id === id),
          count: value,
        });
      }
    },
    setFormFieldValue(state, field) {
      state.form[field.name] = field.value;
    },
  },
  actions: {
    async fetchSourceAdditions({ commit }) {
      try {
        const additions = await this.$api.misc.query();
        commit("setSourceAdditions", additions);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
