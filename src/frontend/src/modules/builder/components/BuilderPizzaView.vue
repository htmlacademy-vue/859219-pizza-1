<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="pizzaFoundationClass">
        <div class="pizza__wrapper">
          <div
            class="pizza__filling"
            v-for="ingredient in selectedItems.ingredients"
            :key="ingredient.id"
            :class="[
              `pizza__filling--${Ingredient[ingredient.id]}`,
              {
                'pizza__filling--second': ingredient.value === 2,
                'pizza__filling--third': ingredient.value === 3,
              },
            ]"
          />
        </div>
      </div>
    </div>

    <div class="content__result">
      <BuilderPriceCounter :items="items" :selected-items="selectedItems" />
      <button
        type="button"
        class="button"
        :disabled="!value.length || !selectedItems.ingredients.length"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter";
import { Ingredient, Sauce } from "../../../common/constants";

export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter },
  computed: {
    pizzaFoundationClass() {
      const selectedDough = this.selectedItems.dough.id === 1 ? "small" : "big";
      const selectedSauce = Sauce[this.selectedItems.sauce.id];

      return `pizza--foundation--${selectedDough}-${selectedSauce}`;
    },
  },
  data() {
    return {
      Ingredient,
    };
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
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
