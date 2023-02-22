<template>
  <Drop @drop="incrementCounterValue">
    <div class="pizza" :class="pizzaFoundationClass">
      <div class="pizza__wrapper">
        <div
          class="pizza__filling"
          v-for="ingredient in pizza.ingredients"
          :key="ingredient.id"
          :class="pizzaFillingClass(ingredient)"
        />
      </div>
    </div>
  </Drop>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import { Ingredient, Sauce } from "../../../common/constants";
import Drop from "../../../common/hocs/Drop";

export default {
  name: "BuilderPizzaFoundation",
  components: { Drop },
  computed: {
    ...mapState("Builder", ["pizza"]),
    Ingredient() {
      return Ingredient;
    },
    Sauce() {
      return Sauce;
    },
    pizzaFoundationClass() {
      const pizzaDough = this.pizza.dough.id === 1 ? "small" : "big";
      const pizzaSauce = Sauce[this.pizza.sauce.id];

      return `pizza--foundation--${pizzaDough}-${pizzaSauce}`;
    },
  },
  methods: {
    ...mapMutations("Builder", ["changePizzaIngredients"]),
    incrementCounterValue({ id }) {
      this.changePizzaIngredients({
        id,
        value: 1,
      });
    },
    pizzaFillingClass({ id, value }) {
      return [
        `pizza__filling--${Ingredient[id]}`,
        {
          "pizza__filling--second": value === 2,
          "pizza__filling--third": value === 3,
        },
      ];
    },
  },
};
</script>
