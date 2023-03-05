import { uniqueId } from "lodash";

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  mutations: {
    addNotification(state, payload) {
      state.notifications.push(payload);
    },
    removeNotification(state, payload) {
      const itemIndex = state.notifications.findIndex(
        (item) => item.id === payload
      );

      state.notifications.splice(itemIndex, 1);
    },
  },
  actions: {
    async createNotification({ commit }, entity) {
      const notification = {
        ...entity,
        id: uniqueId("notification-"),
      };
      commit("addNotification", notification);
      setTimeout(() => commit("removeNotification", notification.id), 3000);
    },
  },
};
