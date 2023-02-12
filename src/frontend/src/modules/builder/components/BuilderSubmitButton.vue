<template>
  <button type="button" class="button" :disabled="isButtonDisabled">
    Готовьте!
  </button>
</template>

<script>
export default {
  name: "BuilderSubmitButton",
  computed: {
    isButtonDisabled() {
      return !this.pizzaName.length || !this.pizzaIngredients.length;
    },
  },
  props: {
    pizzaIngredients: {
      type: Array,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
  },
};
</script>
