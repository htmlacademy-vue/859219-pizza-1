<template>
  <section class="footer">
    <div class="footer__more">
      <a
        class="button button--border button--arrow"
        @click.prevent="makeAnotherPizza"
      >
        Хочу еще одну
      </a>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalCost }} ₽</b>
    </div>

    <div class="footer__submit">
      <button class="button" type="submit" @click.prevent="makeOrder">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartFooter",
  computed: mapGetters("Cart", ["totalCost"]),
  methods: {
    ...mapMutations("Cart", ["resetCart", "resetForm"]),
    ...mapMutations("Builder", ["resetPizza"]),
    makeAnotherPizza() {
      this.resetPizza();
      this.$router.push("/");
    },
    makeOrder() {
      this.$emit("open-popup");
      this.resetPizza();
      this.resetCart();
      this.resetForm();
    },
  },
};
</script>
