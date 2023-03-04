export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    normalizedOrders(state, getters, rootState) {
      return state.orders.map((order) => {
        return {
          id: order.id,
          products: order.orderPizzas?.map((pizza) => {
            return {
              id: pizza.id,
              dough: rootState.Builder.source.dough.find(
                (item) => item.id === pizza.doughId
              ),
              size: rootState.Builder.source.sizes.find(
                (item) => item.id === pizza.sizeId
              ),
              sauce: rootState.Builder.source.sauces.find(
                (item) => item.id === pizza.sauceId
              ),
              ingredients: pizza.ingredients.map((item) => {
                const ingredient = rootState.Builder.source.ingredients.find(
                  (it) => it.id === item.ingredientId
                );

                return { ...ingredient, count: item.quantity };
              }),
              name: pizza.name,
              count: pizza.quantity,
            };
          }),
          additions: order.orderMisc
            ? order.orderMisc.map((item) => {
                const addition = rootState.Cart.source.additions.find(
                  (it) => it.id === item.miscId
                );

                return { ...addition, count: item.quantity };
              })
            : [],
          address: order.orderAddress
            ? {
                type: order.orderAddress.id,
                tel: order.phone,
                street: order.orderAddress.street,
                house: order.orderAddress.building,
                apartment: order.orderAddress.flat,
                comment: order.orderAddress.comment,
              }
            : {
                type: "self-delivery",
                tel: order.phone,
              },
          addressName: order.orderAddress?.name,
        };
      });
    },
  },
  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    },
    addOrder(state, payload) {
      state.orders.push(payload);
    },
    removeOrder(state, payload) {
      const itemIndex = state.orders.findIndex((item) => item.id === payload);

      state.orders.splice(itemIndex, 1);
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      try {
        const orders = await this.$api.orders.query();
        commit("setOrders", orders);
      } catch (error) {
        this.$notifier.error(error);
      }
    },
    async createOrder({ commit }, entity) {
      try {
        const order = await this.$api.orders.post(entity);
        commit("addOrder", order);
        return order;
      } catch (error) {
        this.$notifier.error(error);
      }
    },
    async deleteOrder({ commit }, id) {
      try {
        await this.$api.orders.delete(id);
        commit("removeOrder", id);
      } catch (error) {
        this.$notifier.error(error);
      }
    },
  },
};
