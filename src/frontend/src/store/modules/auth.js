import addresses from "../../static/addresses.json";
import user from "../../static/user.json";

export default {
  namespaced: true,
  state: {
    user: null,
    addresses: [],
  },
  getters: {
    isAuthorized(state) {
      return !!state.user;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAddresses(state, payload) {
      state.addresses = payload;
    },
  },
  actions: {
    fetchUser({ commit }) {
      const response = user;

      commit("setUser", response);
    },
    fetchAddresses({ commit }) {
      const response = addresses;

      commit("setAddresses", response);
    },
  },
};
