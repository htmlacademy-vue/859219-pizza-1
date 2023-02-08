<template>
  <Drag :transfer-data="item" :draggable="isDraggable(item.id)">
    <span class="filling" :class="`filling--${Ingredient[item.id]}`">
      {{ item.name }}
    </span>
  </Drag>
</template>

<script>
import Drag from "../../common/hocs/Drag";
import { Ingredient, MAX_VALUE } from "../constants";

export default {
  name: "SelectorItem",
  components: {
    Drag,
  },
  methods: {
    isDraggable(id) {
      return !(
        this.selectedItems.ingredients.find((ing) => ing.id === id)?.value ===
        MAX_VALUE
      );
    },
  },
  data() {
    return {
      Ingredient,
    };
  },
  props: {
    item: {
      id: {
        type: Number,
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
