<template>
  <AppDrop @drop="incrementCounterValue">
    <div class="pizza" :class="pizzaFoundationClass">
      <div class="pizza__wrapper">
        <transition-group name="ingredient" appear>
          <div
            class="pizza__filling"
            v-for="ingredient in pizza.ingredients"
            :key="ingredient.id"
            :class="pizzaFillingClass(ingredient)"
          />
        </transition-group>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import Ingredient from "../../../common/enums/ingredient";
import AppDrop from "../../../common/hocs/AppDrop";

export default {
  name: "BuilderPizzaFoundation",
  components: { AppDrop },
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

<style lang="scss">
.ingredient {
  &-leave-to,
  &-enter {
    transform: scale(1.5);
    transition: all 0.5s;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
    transition: all 0.5s;
  }
}
</style>
