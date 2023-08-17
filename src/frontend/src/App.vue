<template>
  <AppLayout>
    <transition name="slide" mode="out-in" appear>
      <router-view />
    </transition>
  </AppLayout>
</template>

<script>
import { mapActions } from "vuex";

import { setAuth } from "./common/helpers";

export default {
  name: "App",
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.init();
  },
  methods: mapActions(["init"]),
};
</script>

<style lang="scss">
@import "./assets/scss/app";

.slide {
  &-enter {
    opacity: 0;
    margin-left: 90px;

    &-active {
      transition: all 0.4s;
    }
  }

  &-leave-active {
    transition: all 0.4s;
    opacity: 0;
    margin-left: -100px;
  }
}
</style>
