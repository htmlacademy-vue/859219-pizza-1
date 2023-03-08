<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import { mapActions } from "vuex";

import { setAuth } from "./common/helpers";

export default {
  name: "App",
  methods: mapActions(["init"]),
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.log(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.init();
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app";
</style>
