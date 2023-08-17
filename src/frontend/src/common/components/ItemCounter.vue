<template>
  <div class="counter">
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
export default {
  name: "ItemCounter",
  props: {
    item: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: Infinity,
    },
  },
  computed: {
    currentItem() {
      return this.items.find((item) => item.id === this.item.id);
    },
    counterValue() {
      return this.currentItem?.count ?? this.minValue;
    },
    isDecrementDisabled() {
      return !this.currentItem;
    },
    isIncrementDisabled() {
      return this.currentItem?.count === this.maxValue;
    },
  },
  methods: {
    decrementCounterValue() {
      this.$emit("change-counter-value", {
        id: this.item.id,
        value: -1,
      });
    },
    incrementCounterValue() {
      this.$emit("change-counter-value", {
        id: this.item.id,
        value: 1,
      });
    },
  },
};
</script>
