<template>
  <ul class="cart-list sheet" v-if="cart.products.length">
    <li
      class="cart-list__item"
      v-for="product in cart.products"
      :key="product.id"
    >
      <ProductCard class="cart-list__product" :product="product" />

      <ItemCounter
        class="counter--orange cart-list__counter"
        :item="product"
        :items="cart.products"
        @change-counter-value="changeCartProducts"
      />

      <div class="cart-list__price">
        <b>{{ product.price * product.count }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          class="cart-list__edit"
          type="button"
          @click="changeProduct(product)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>

  <div class="sheet cart__empty" v-else>
    <p>В корзине нет ни одного товара</p>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import ItemCounter from "../../../common/components/ItemCounter";
import ProductCard from "../../../common/components/ProductCard";

export default {
  name: "CartProductsSelector",
  components: { ProductCard, ItemCounter },
  computed: mapState("Cart", ["source", "cart"]),
  methods: {
    ...mapMutations("Cart", ["changeCartProducts"]),
    ...mapMutations("Builder", ["setCartPizza"]),

    changeProduct(product) {
      this.setCartPizza(product);
      this.$router.push("/");
    },
  },
};
</script>
