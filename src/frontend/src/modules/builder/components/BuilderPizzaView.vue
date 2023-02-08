<template>
  <Drop @drop="changeCounterValue">
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
              :class="pizzaFillingClass(ingredient)"
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
  </Drop>
</template>

<script>
import { Ingredient, Sauce } from "../../../common/constants";
import Drop from "../../../common/hocs/Drop";
import BuilderPriceCounter from "./BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",
  components: { Drop, BuilderPriceCounter },
  computed: {
    pizzaFoundationClass() {
      const selectedDough = this.selectedItems.dough.id === 1 ? "small" : "big";
      const selectedSauce = Sauce[this.selectedItems.sauce.id];

      return `pizza--foundation--${selectedDough}-${selectedSauce}`;
    },
  },
  methods: {
    pizzaFillingClass({ id, value }) {
      return [
        `pizza__filling--${Ingredient[id]}`,
        {
          "pizza__filling--second": value === 2,
          "pizza__filling--third": value === 3,
        },
      ];
    },
    changeCounterValue({ id }) {
      this.$emit("change-selected-item", {
        name: "ingredients",
        id,
        value: 1,
      });
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
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
