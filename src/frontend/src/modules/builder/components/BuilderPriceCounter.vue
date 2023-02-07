<template>
  <p>Итого: {{ pizzaTotalPrice }} ₽</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  computed: {
    pizzaTotalPrice() {
      return (
        this.selectedItems.size.multiplier *
        (this.selectedItems.dough.price +
          this.selectedItems.sauce.price +
          this.getIngredientsPrice(this.selectedItems.ingredients))
      );
    },
  },
  methods: {
    getIngredientsPrice(ingredients) {
      return ingredients.reduce((sum, item) => {
        return sum + (item?.value ?? 1) * item.price;
      }, 0);
    },
  },
  props: {
    items: {
      type: Object,
      required: true,
    },
    selectedItems: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
