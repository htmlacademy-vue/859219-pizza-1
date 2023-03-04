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
    addAddress(state, payload) {
      const itemIndex = state.addresses.findIndex(
        (item) => item.id === payload.id
      );

      if (~itemIndex) {
        state.addresses.splice(itemIndex, 1, payload);
      } else {
        state.addresses.push(payload);
      }
    },
    removeAddress(state, payload) {
      const itemIndex = state.addresses.findIndex(
        (item) => item.id === payload
      );

      state.addresses.splice(itemIndex, 1);
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      try {
        const { token } = await this.$api.auth.login(credentials);
        this.$jwt.saveToken(token);
        this.$api.auth.setAuthHeader();
        dispatch("getMe");
        return token;
      } catch (error) {
        console.log(error);
      }
    },
    async logout({ commit }, isRequested = true) {
      try {
        if (isRequested) await this.$api.auth.logout();
        this.$jwt.destroyToken();
        this.$api.auth.setAuthHeader();
        commit("setUser", null);
      } catch (error) {
        console.log(error);
      }
    },
    async getMe({ commit, dispatch }) {
      try {
        const user = await this.$api.auth.getMe();
        commit("setUser", user);
        dispatch("fetchAddresses");
      } catch {
        dispatch("logout", false);
      }
    },
    async fetchAddresses({ commit }) {
      try {
        const addresses = await this.$api.addresses.query();
        commit("setAddresses", addresses);
      } catch (error) {
        this.$notifier.error(error);
      }
    },
    async createAddress({ commit }, entity) {
      try {
        const address = await this.$api.addresses.post(entity);
        commit("addAddress", address);
      } catch (error) {
        this.$notifier.error(error);
      }
    },
    async updateAddress({ commit }, entity) {
      try {
        await this.$api.addresses.put(entity);
        commit("addAddress", entity);
      } catch (error) {
        this.$notifier.error(error);
      }
    },
    async deleteAddress({ commit }, id) {
      try {
        await this.$api.addresses.delete(id);
        commit("removeAddress", id);
      } catch (error) {
        this.$notifier.error(error);
      }
    },
  },
};
