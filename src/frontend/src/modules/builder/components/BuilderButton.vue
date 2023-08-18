<template>
  <button
    type="button"
    class="button"
    :disabled="!pizza.name.length || !pizza.ingredients.length"
    @click="createPizza"
  >
    Готовьте!
  </button>
</template>

<script>
import { uniqueId } from "lodash";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "BuilderButton",
  computed: {
    ...mapState("Builder", ["pizza"]),
    ...mapGetters("Builder", ["pizzaCost"]),
  },
  methods: {
    ...mapMutations("Builder", ["resetPizza"]),
    ...mapMutations("Cart", ["setCartProduct"]),

    createPizza() {
      this.setCartProduct({
        id: uniqueId("pizza-"),
        price: this.pizzaCost,
        count: 1,
        ...this.pizza,
      });
      this.resetPizza();
      this.$notifier.success("Пицца успешно добавлена в корзину");
    },
  },
};
</script>
