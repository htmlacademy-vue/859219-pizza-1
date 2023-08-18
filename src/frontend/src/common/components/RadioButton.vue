<template>
  <label>
    <input
      class="visually-hidden"
      type="radio"
      :value="value"
      :checked="checked"
      v-on="$listeners"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    value: {
      type: Number,
      required: true,
    },

    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
