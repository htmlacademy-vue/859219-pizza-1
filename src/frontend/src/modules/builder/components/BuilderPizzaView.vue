<template>
  <div class="content__pizza">
    <BuilderPizzaName @change-pizza-name="$emit('change-pizza-name', $event)" />

    <div class="content__constructor">
      <BuilderPizzaFoundation
        :pizza-dough-id="pizzaItems.dough.id"
        :pizza-sauce-id="pizzaItems.sauce.id"
        :pizza-ingredients="pizzaItems.ingredients"
        @change-pizza-ingredients="$emit('change-pizza-ingredients', $event)"
      />
    </div>

    <div class="content__result">
      <BuilderPriceCounter :pizza-price="pizzaPrice" />
      <BuilderSubmitButton
        :pizza-ingredients="pizzaItems.ingredients"
        :pizza-name="pizzaName"
      />
    </div>
  </div>
</template>

<script>
import { Ingredient, Sauce } from "../../../common/constants";
import BuilderPizzaFoundation from "./BuilderPizzaFoundation";
import BuilderPizzaName from "./BuilderPizzaName";
import BuilderPriceCounter from "./BuilderPriceCounter";
import BuilderSubmitButton from "./BuilderSubmitButton";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPizzaFoundation,
    BuilderPizzaName,
    BuilderPriceCounter,
    BuilderSubmitButton,
  },
  computed: {
    pizzaFoundationClass() {
      const pizzaDough = this.pizzaItems.dough.id === 1 ? "small" : "big";
      const pizzaSauce = Sauce[this.pizzaItems.sauce.id];

      return `pizza--foundation--${pizzaDough}-${pizzaSauce}`;
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
  },
  props: {
    pizzaItems: {
      type: Object,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
    pizzaPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>
