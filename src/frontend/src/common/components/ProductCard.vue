<template>
  <div class="product">
    <img
      src="../../assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="product.name"
    />
    <div class="product__text">
      <h2>{{ product.name }}</h2>
      <ul>
        <li>{{ product.size.name }}, на {{ productDough }} тесте</li>
        <li>Соус: {{ productSauce }}</li>
        <li>Начинка: {{ productIngredients }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  computed: {
    productDough() {
      return this.product.dough.name === "Тонкое" ? "тонком" : "толстом";
    },
    productSauce() {
      return this.product.sauce.name.toLowerCase();
    },
    productIngredients() {
      return this.product.ingredients
        .map((ingredient) => ingredient.name.toLowerCase())
        .join(", ");
    },
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
