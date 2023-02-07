<template>
  <span class="filling" :class="`filling--${Ingredient[item.id]}`">
    {{ item.name }}
  </span>
</template>

<script>
import { Ingredient } from "../constants";

export default {
  name: "SelectorItem",
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
  },
};
</script>

<style scoped></style>
