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
            v-for="sauce in source.sauces"
            :key="sauce.id"
            :value="sauce.id"
            :checked="pizza.sauce.id === sauce.id"
            @change="changePizzaSauce($event.target.value)"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="ingredient in source.ingredients"
              :key="ingredient.id"
            >
              <SelectorItem :ingredient="ingredient" />

              <ItemCounter
                class="ingredients__counter"
                :item="ingredient"
                :items="pizza.ingredients"
                :max-value="MAX_VALUE"
                @change-counter-value="changePizzaIngredients"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import ItemCounter from "../../../common/components/ItemCounter";
import RadioButton from "../../../common/components/RadioButton";
import SelectorItem from "../../../common/components/SelectorItem";
import { MAX_INGREDIENT_COUNT } from "../../../common/constants";
import Ingredient from "../../../common/enums/ingredient";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    RadioButton,
    SelectorItem,
  },
  computed: {
    ...mapState("Builder", ["source", "pizza"]),
    Ingredient() {
      return Ingredient;
    },
    MAX_VALUE() {
      return MAX_INGREDIENT_COUNT;
    },
  },
  methods: mapMutations("Builder", [
    "changePizzaSauce",
    "changePizzaIngredients",
  ]),
};
</script>
