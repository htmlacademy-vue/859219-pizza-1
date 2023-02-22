import misc from "../../static/misc.json";

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
    },
  },
  getters: {
    totalCost(state) {
      const productsCost = state.cart.products.reduce((sum, item) => {
        return sum + (item?.value ?? 1) * item.price;
      }, 0);

      const additionsCost = state.cart.additions.reduce((sum, item) => {
        return sum + (item?.value ?? 1) * item.price;
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
    resetCart(state) {
      state.cart.products = [];
      state.cart.additions = [];
    },
    changeCartProducts(state, { id, value }) {
      const itemIndex = state.cart.products.findIndex((item) => item.id === id);
      const item = state.cart.products[itemIndex];
      const itemValue = item.value + value;

      if (itemValue) {
        item.value = itemValue;
      } else {
        state.cart.products.splice(itemIndex, 1);
      }
    },
    changeCartAdditions(state, { id, value }) {
      const itemIndex = state.cart.additions.findIndex(
        (item) => item.id === id
      );

      if (~itemIndex) {
        const item = state.cart.additions[itemIndex];
        const itemValue = item.value + value;

        if (itemValue) {
          item.value = itemValue;
        } else {
          state.cart.additions.splice(itemIndex, 1);
        }
      } else {
        state.cart.additions.push({
          ...(state.source.additions.find((item) => item.id === id) || []),
          value,
        });
      }
    },
    setFormFieldValue(state, field) {
      state.form[field.name] = field.value;
    },
    resetForm(state) {
      state.form.type = "self-delivery";
      state.form.tel = "";
      state.form.street = "";
      state.form.house = "";
      state.form.apartment = "";
    },
  },
  actions: {
    fetchSourceAdditions({ commit }) {
      const response = misc;

      commit("setSourceAdditions", response);
    },
  },
};
