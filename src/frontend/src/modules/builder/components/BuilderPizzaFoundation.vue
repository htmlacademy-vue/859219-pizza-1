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

import Ingredient from "../../../common/enums/ingredient";
import Drop from "../../../common/hocs/Drop";

export default {
  name: "BuilderPizzaFoundation",
  components: { Drop },
  computed: {
    ...mapState("Builder", ["pizza"]),
    pizzaFoundationClass() {
      const pizzaDough = this.pizza.dough.name === "Тонкое" ? "small" : "big";
      const pizzaSauce =
        this.pizza.sauce.name === "Томатный" ? "tomato" : "creamy";

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
    pizzaFillingClass({ name, count }) {
      let value = "";

      for (const key in Ingredient) {
        if (Ingredient[key] === name) {
          value = key;
        }
      }

      return [
        `pizza__filling--${value}`,
        {
          "pizza__filling--second": count === 2,
          "pizza__filling--third": count === 3,
        },
      ];
    },
  },
};
</script>
