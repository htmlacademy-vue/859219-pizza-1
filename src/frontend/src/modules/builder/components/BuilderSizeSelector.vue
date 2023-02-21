<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          class="diameter__input"
          name="diameter"
          v-for="size in source.sizes"
          :key="size.id"
          :class="`diameter__input--${Size[size.id]}`"
          :value="size.id"
          :checked="pizza.size.id === size.id"
          @change="changePizzaSize($event.target.value)"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import RadioButton from "../../../common/components/RadioButton";
import { Size } from "../../../common/constants";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  computed: {
    ...mapState("Builder", ["source", "pizza"]),
    Size() {
      return Size;
    },
  },
  methods: {
    ...mapMutations("Builder", ["changePizzaSize"]),
  },
};
</script>
