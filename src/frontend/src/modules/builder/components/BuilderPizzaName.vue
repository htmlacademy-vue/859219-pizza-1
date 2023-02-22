<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="pizza.name"
      @input="changePizzaName($event.target.value)"
    />
  </label>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "BuilderPizzaName",
  computed: mapState("Builder", ["pizza"]),
  methods: mapMutations("Builder", ["changePizzaName"]),
};
</script>
