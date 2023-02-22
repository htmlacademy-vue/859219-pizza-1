<template>
  <form class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartEmpty v-if="isCartEmpty" />

        <CartProductsSelector v-if="!isCartEmpty" />

        <CartAdditionsSelector v-if="!isCartEmpty" />

        <CartDelivery v-if="!isCartEmpty" />
      </div>
    </main>

    <CartFooter v-if="!isCartEmpty" @open-popup="openPopup" />

    <CartPopup v-if="showPopup" @close-popup="closePopup" />
  </form>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import CartAdditionsSelector from "../modules/cart/components/CartAdditionsSelector";
import CartDelivery from "../modules/cart/components/CartDelivery";
import CartEmpty from "../modules/cart/components/CartEmpty";
import CartFooter from "../modules/cart/components/CartFooter";
import CartPopup from "../modules/cart/components/CartPopup";
import CartProductsSelector from "../modules/cart/components/CartProductsSelector";

export default {
  name: "Cart",
  components: {
    CartPopup,
    CartAdditionsSelector,
    CartDelivery,
    CartEmpty,
    CartFooter,
    CartProductsSelector,
  },
  data() {
    return {
      showPopup: false,
    };
  },
  computed: {
    ...mapState("Cart", ["cart"]),
    ...mapGetters("Auth", ["isAuthorized"]),
    isCartEmpty() {
      return !this.cart.products.length;
    },
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.$router.push(this.isAuthorized ? "/orders" : "/");
    },
  },
};
</script>
