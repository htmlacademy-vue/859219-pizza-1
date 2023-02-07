<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          class="diameter__input"
          name="diameter"
          v-for="size in items.size"
          :key="size.id"
          :class="`diameter__input--${Size[size.id]}`"
          :value="size.id"
          :checked="selectedItems.size.id === size.id"
          @change="
            $emit('change-selected-item', {
              name: 'size',
              id: $event.target.value,
            })
          "
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
  data() {
    return {
      Size,
    };
  },
  props: {
    items: {
      sizes: {
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
