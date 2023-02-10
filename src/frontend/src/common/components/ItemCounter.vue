<template>
  <div class="counter ingredients__counter">
    <button
      class="counter__button counter__button--minus"
      type="button"
      :disabled="isDecrementDisabled"
      @click="decrementCounterValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      class="counter__input"
      type="text"
      name="counter"
      readonly
      :value="counterValue"
    />
    <button
      class="counter__button counter__button--plus"
      type="button"
      :disabled="isIncrementDisabled"
      @click="incrementCounterValue"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MAX_VALUE, MIN_VALUE } from "../constants";

export default {
  name: "ItemCounter",
  computed: {
    pizzaIngredient() {
      return this.pizzaIngredients.find(
        (item) => item.id === this.ingredient.id
      );
    },
    counterValue() {
      return this.pizzaIngredient?.value ?? this.minValue;
    },
    isDecrementDisabled() {
      return !this.pizzaIngredient;
    },
    isIncrementDisabled() {
      return this.pizzaIngredient?.value === this.maxValue;
    },
  },
  methods: {
    decrementCounterValue() {
      this.$emit("change-pizza-ingredients", {
        id: this.ingredient.id,
        value: -1,
      });
    },
    incrementCounterValue() {
      this.$emit("change-pizza-ingredients", {
        id: this.ingredient.id,
        value: 1,
      });
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
    minValue: {
      type: Number,
      default: MIN_VALUE,
    },
    maxValue: {
      type: Number,
      default: MAX_VALUE,
    },
  },
};
</script>
