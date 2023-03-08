<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          class="diameter__input"
          name="diameter"
          v-for="size in normalizedSourceSizes"
          :key="size.id"
          :class="diameterInputClass(size)"
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
import { mapGetters, mapMutations, mapState } from "vuex";

import RadioButton from "../../../common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    ...mapGetters("Builder", ["normalizedSourceSizes"]),
  },
  methods: {
    ...mapMutations("Builder", ["changePizzaSize"]),
    diameterInputClass({ multiplier }) {
      switch (multiplier) {
        case 1:
          return "diameter__input--small";
        case 2:
          return "diameter__input--normal";
        case 3:
          return "diameter__input--big";
      }
    },
  },
};
</script>
