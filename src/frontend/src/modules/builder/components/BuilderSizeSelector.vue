<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          class="diameter__input"
          name="diameter"
          v-for="size in sourceSizes"
          :key="size.id"
          :class="`diameter__input--${Size[size.id]}`"
          :value="size.id"
          :checked="pizzaSizeId === size.id"
          @change="$emit('change-pizza-size', $event.target.value)"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";
import { Size } from "../../../common/constants";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  computed: {
    Size() {
      return Size;
    },
  },
  props: {
    sourceSizes: {
      type: Array,
      required: true,
    },
    pizzaSizeId: {
      type: Number,
      required: true,
    },
  },
};
</script>
