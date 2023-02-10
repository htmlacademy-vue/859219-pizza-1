<template>
  <Drag :transfer-data="ingredient" :draggable="isDraggable(ingredient.id)">
    <span class="filling" :class="`filling--${Ingredient[ingredient.id]}`">
      {{ ingredient.name }}
    </span>
  </Drag>
</template>

<script>
import Drag from "../../common/hocs/Drag";
import { Ingredient, MAX_VALUE } from "../constants";

export default {
  name: "SelectorItem",
  components: {
    Drag,
  },
  methods: {
    isDraggable(id) {
      return !(
        this.pizzaIngredients.find((item) => item.id === id)?.value ===
        this.maxValue
      );
    },
  },
  computed: {
    Ingredient() {
      return Ingredient;
    },
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    pizzaIngredients: {
      type: Array,
      required: true,
    },
    maxValue: {
      type: Number,
      default: MAX_VALUE,
    },
  },
};
</script>

<style scoped></style>
