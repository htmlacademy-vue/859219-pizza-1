<template>
  <ul class="cart-list sheet">
    <li
      class="cart-list__item"
      v-for="product in cart.products"
      :key="product.id"
    >
      <div class="product cart-list__product">
        <img
          src="../../../assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="product.name"
        />
        <div class="product__text">
          <h2>{{ product.name }}</h2>
          <ul>
            <li>
              {{ product.size.name }}, на
              {{ product.dough.id === 1 ? "тонком" : "толстом" }} тесте
            </li>
            <li>Соус: {{ product.sauce.name.toLowerCase() }}</li>
            <li>
              Начинка:
              {{
                product.ingredients
                  .map((ingredient) => ingredient.name.toLowerCase())
                  .join(", ")
              }}
            </li>
          </ul>
        </div>
      </div>

      <ItemCounter
        class="counter--orange cart-list__counter"
        :item="product"
        :items="cart.products"
        @change-counter-value="changeCartProducts"
      />

      <div class="cart-list__price">
        <b>{{ product.price * product.value }} ₽</b>
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
</template>

<script>
import { mapMutations, mapState } from "vuex";

import ItemCounter from "../../../common/components/ItemCounter";

export default {
  name: "CartProductsSelector",
  components: { ItemCounter },
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
