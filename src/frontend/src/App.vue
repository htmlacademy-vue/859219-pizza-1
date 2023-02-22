<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: mapActions(["init"]),
  created() {
    this.init();
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app";
</style>
