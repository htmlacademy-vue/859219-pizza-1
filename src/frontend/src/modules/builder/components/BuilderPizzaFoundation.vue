<template>
  <Drop @drop="incrementCounterValue">
    <div class="pizza" :class="pizzaFoundationClass">
      <div class="pizza__wrapper">
        <div
          class="pizza__filling"
          v-for="ingredient in pizzaIngredients"
          :key="ingredient.id"
          :class="pizzaFillingClass(ingredient)"
        />
      </div>
    </div>
  </Drop>
</template>

<script>
import { Ingredient, Sauce } from "../../../common/constants";
import Drop from "../../../common/hocs/Drop";

export default {
  name: "BuilderPizzaFoundation",
  components: { Drop },
  computed: {
    Ingredient() {
      return Ingredient;
    },
    Sauce() {
      return Sauce;
    },
    pizzaFoundationClass() {
      const pizzaDough = this.pizzaDoughId === 1 ? "small" : "big";
      const pizzaSauce = Sauce[this.pizzaSauceId];

      return `pizza--foundation--${pizzaDough}-${pizzaSauce}`;
    },
  },
  methods: {
    incrementCounterValue({ id }) {
      this.$emit("change-pizza-ingredients", {
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
  props: {
    pizzaDoughId: {
      type: Number,
      required: true,
    },
    pizzaSauceId: {
      type: Number,
      required: true,
    },
    pizzaIngredients: {
      type: Array,
      required: true,
    },
  },
};
</script>
