<template>
  <Drag :transfer-data="ingredient" :draggable="isDraggable">
    <span class="filling" :class="`filling--${Ingredient[ingredient.id]}`">
      {{ ingredient.name }}
    </span>
  </Drag>
</template>

<script>
import { mapState } from "vuex";

import Drag from "../../common/hocs/Drag";

import { Ingredient, MAX_VALUE } from "../constants";

export default {
  name: "SelectorItem",
  components: {
    Drag,
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    Ingredient() {
      return Ingredient;
    },
    isDraggable() {
      return !(
        this.pizza.ingredients.find((item) => item.id === this.ingredient.id)
          ?.value === this.maxValue
      );
    },
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    maxValue: {
      type: Number,
      default: MAX_VALUE,
    },
  },
};
</script>
