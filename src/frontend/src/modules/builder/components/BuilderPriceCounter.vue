<template>
  <p>Итого: {{ pizzaCost }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: mapGetters("Builder", ["pizzaCost"]),
};
</script>
