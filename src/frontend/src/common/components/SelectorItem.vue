<template>
  <DragItem :transfer-data="ingredient" :draggable="isDraggable">
    <span class="filling" :class="ingredientClass">
      {{ ingredient.name }}
    </span>
  </DragItem>
</template>

<script>
import { mapState } from "vuex";

import { MAX_INGREDIENT_COUNT } from "../constants";
import Ingredient from "../enums/ingredient";
import DragItem from "../hocs/DragItem";

export default {
  name: "SelectorItem",
  components: {
    DragItem,
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    isDraggable() {
      return !(
        this.pizza.ingredients.find((item) => item.id === this.ingredient.id)
          ?.count === MAX_INGREDIENT_COUNT
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
};
</script>
