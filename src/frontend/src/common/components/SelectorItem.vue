<template>
  <Drag :transfer-data="ingredient" :draggable="isDraggable">
    <span class="filling" :class="ingredientClass">
      {{ ingredient.name }}
    </span>
  </Drag>
</template>

<script>
import { mapState } from "vuex";

import Drag from "../../common/hocs/Drag";

import { MAX_INGREDIENT_COUNT } from "../constants";
import Ingredient from "../enums/ingredient";

export default {
  name: "SelectorItem",
  components: {
    Drag,
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    isDraggable() {
      return !(
        this.pizza.ingredients.find((item) => item.id === this.ingredient.id)
          ?.count === this.maxValue
      );
    },
    ingredientClass() {
      let value = "";

      for (const key in Ingredient) {
        if (Ingredient[key] === this.ingredient.name) {
          value = key;
        }
      }

      return `filling--${value}`;
    },
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    maxValue: {
      type: Number,
      default: MAX_INGREDIENT_COUNT,
    },
  },
};
</script>
