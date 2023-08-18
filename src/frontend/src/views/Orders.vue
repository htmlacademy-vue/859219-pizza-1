<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <template v-if="normalizedOrders.length">
      <section
        class="sheet order"
        v-for="order in normalizedOrders"
        :key="order.id"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ totalCost(order) }} ₽</span>
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="removeOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="repeatOrder(order)">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li
            class="order__item"
            v-for="product in order.products"
            :key="product.id"
          >
            <ProductCard :product="product" />

            <p class="order__price">
              {{ product.count }} × {{ pizzaCost(product) }} ₽
            </p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="addition in order.additions" :key="addition.id">
            <img
              width="20"
              height="30"
              :src="addition.image"
              :alt="addition.name"
            />
            <p>
              <span>{{ addition.name }}</span>
              <b>{{ addition.count }} × {{ addition.price }} ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address" v-if="order.addressName">
          Адрес доставки: {{ order.addressName }}
        </p>
      </section>
    </template>

    <div class="sheet cart__empty" v-else>
      <p>В истории нет ни одного заказа</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import ProductCard from "../common/components/ProductCard";
import { auth } from "../middlewares";

export default {
  name: "Orders",
  layout: "AppLayoutPrivate",
  middlewares: { auth },
  components: { ProductCard },
  computed: mapGetters("Orders", ["normalizedOrders"]),
  mounted() {
    this.fetchOrders();
  },
  methods: {
    ...mapMutations("Cart", ["setCart"]),
    ...mapActions("Orders", ["fetchOrders", "deleteOrder"]),

    pizzaCost(pizza) {
      const ingredientsCost = pizza.ingredients.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);

      return (
        pizza.size.multiplier *
        (pizza.dough.price + pizza.sauce.price + ingredientsCost)
      );
    },

    totalCost(order) {
      const productsCost = order.products?.reduce((sum, item) => {
        return sum + item.count * this.pizzaCost(item);
      }, 0);

      const additionsCost = order.additions?.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);

      return productsCost + additionsCost;
    },

    removeOrder(id) {
      this.deleteOrder(id);
    },

    repeatOrder(order) {
      this.setCart({
        ...order,
        products: order.products.map((item) => {
          return { ...item, price: this.pizzaCost(item) };
        }),
      });
      this.$router.push("/cart");
    },
  },
};
</script>
