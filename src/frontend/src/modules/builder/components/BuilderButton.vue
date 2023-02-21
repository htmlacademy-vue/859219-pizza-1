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
        id: Math.floor(Math.random() * 100),
        price: this.pizzaCost,
        value: 1,
        ...this.pizza,
      });
      this.resetPizza();
    },
  },
};
</script>
