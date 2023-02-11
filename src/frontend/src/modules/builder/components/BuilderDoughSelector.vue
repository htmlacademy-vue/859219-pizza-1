<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          class="dough__input"
          name="dough"
          v-for="dough in sourceDough"
          :key="dough.id"
          :class="`dough__input--${Dough[dough.id]}`"
          :value="dough.id"
          :checked="pizzaDoughId === dough.id"
          @change="$emit('change-pizza-dough', $event.target.value)"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "./../../../common/components/RadioButton";
import { Dough } from "../../../common/constants";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  computed: {
    Dough() {
      return Dough;
    },
  },
  props: {
    sourceDough: {
      type: Array,
      required: true,
    },
    pizzaDoughId: {
      type: Number,
      required: true,
    },
  },
};
</script>
