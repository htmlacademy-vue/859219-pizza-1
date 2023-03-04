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
        <li>
          {{ product.size.name }}, на
          {{ product.dough.name === "Тонкое" ? "тонком" : "толстом" }}
          тесте
        </li>
        <li>Соус: {{ product.sauce.name.toLowerCase() }}</li>
        <li>
          Начинка:
          {{
            product.ingredients
              .map((ingredient) => ingredient.name.toLowerCase())
              .join(", ")
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
