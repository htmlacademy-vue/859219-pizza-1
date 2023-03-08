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
