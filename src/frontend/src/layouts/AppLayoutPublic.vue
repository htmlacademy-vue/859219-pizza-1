<template>
  <div id="app">
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "./components/AppLayoutHeader";

export default {
  name: "AppLayoutPublic",
  components: { AppLayoutHeader },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
