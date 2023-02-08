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
            v-for="sauce in items.sauce"
            :key="sauce.id"
            :value="sauce.id"
            :checked="selectedItems.sauce.id === sauce.id"
            @change="
              $emit('change-selected-item', {
                name: 'sauce',
                id: $event.target.value,
              })
            "
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="ingredient in items.ingredients"
              :key="ingredient.id"
            >
              <SelectorItem
                :item="ingredient"
                :selected-items="selectedItems"
              />

              <ItemCounter
                :item="ingredient"
                :selected-items="selectedItems"
                @change-counter-value="changeCounterValue"
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
  data() {
    return {
      Ingredient,
    };
  },
  methods: {
    changeCounterValue({ id, value }) {
      this.$emit("change-selected-item", {
        name: "ingredients",
        id,
        value,
      });
    },
  },
  props: {
    items: {
      sauces: {
        type: Array,
      },
      ingredients: {
        type: Array,
      },
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
