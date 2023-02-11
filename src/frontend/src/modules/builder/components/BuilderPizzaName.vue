<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      @input="$emit('change-pizza-name', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "BuilderPizzaName",
};
</script>

<style scoped></style>
