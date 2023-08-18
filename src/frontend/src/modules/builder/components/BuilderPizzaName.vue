<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      v-model="pizzaName"
    />
  </label>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "BuilderPizzaName",
  computed: {
    ...mapState("Builder", ["pizza"]),

    pizzaName: {
      get() {
        return this.pizza.name;
      },
      set(value) {
        this.changePizzaName(value);
      },
    },
  },
  methods: mapMutations("Builder", ["changePizzaName"]),
};
</script>
