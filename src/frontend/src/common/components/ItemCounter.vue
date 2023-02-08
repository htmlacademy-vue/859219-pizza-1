<template>
  <div class="counter ingredients__counter">
    <button
      class="counter__button counter__button--minus"
      type="button"
      :disabled="isMinusDisabled"
      @click="
        $emit('change-counter-value', {
          id: item.id,
          value: -1,
        })
      "
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
      :disabled="isPlusDisabled"
      @click="
        $emit('change-counter-value', {
          id: item.id,
          value: 1,
        })
      "
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
    isMinusDisabled() {
      return !this.selectedItems.ingredients.some(
        (item) => item.id === this.item.id
      );
    },
    isPlusDisabled() {
      return (
        this.selectedItems.ingredients.find((item) => item.id === this.item.id)
          ?.value === MAX_VALUE
      );
    },
    counterValue() {
      return (
        this.selectedItems.ingredients.find((item) => item.id === this.item.id)
          ?.value ?? MIN_VALUE
      );
    },
  },
  props: {
    item: {
      id: {
        type: Number,
      },
      required: true,
    },
    selectedItems: {
      type: Object,
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
