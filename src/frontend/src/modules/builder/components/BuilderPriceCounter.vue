<template>
  <p>Итого: {{ pizzaPrice }} ₽</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    pizzaPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
