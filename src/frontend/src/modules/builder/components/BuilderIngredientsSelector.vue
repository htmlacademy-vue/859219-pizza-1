<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <RadioButton
            class="radio ingredients__input"
            name="sauce"
            v-for="sauce in sourceSauces"
            :key="sauce.id"
            :value="sauce.id"
            :checked="pizzaSauceId === sauce.id"
            @change="$emit('change-pizza-sauce', $event.target.value)"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="ingredient in sourceIngredients"
              :key="ingredient.id"
            >
              <SelectorItem
                :ingredient="ingredient"
                :pizza-ingredients="pizzaIngredients"
              />

              <ItemCounter
                :ingredient="ingredient"
                :pizza-ingredients="pizzaIngredients"
                @change-pizza-ingredients="
                  $emit('change-pizza-ingredients', $event)
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter";
import RadioButton from "../../../common/components/RadioButton";
import SelectorItem from "../../../common/components/SelectorItem";
import { Ingredient } from "../../../common/constants";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    RadioButton,
    SelectorItem,
  },
  computed: {
    Ingredient() {
      return Ingredient;
    },
  },
  props: {
    sourceSauces: {
      type: Array,
      required: true,
    },
    sourceIngredients: {
      type: Array,
      required: true,
    },
    pizzaSauceId: {
      type: Number,
      required: true,
    },
    pizzaIngredients: {
      type: Array,
      required: true,
    },
  },
};
</script>
