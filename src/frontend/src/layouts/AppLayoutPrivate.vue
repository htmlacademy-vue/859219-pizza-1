<template>
  <div id="app">
    <AppLayoutHeader />
    <AppLayoutSidebar>
      <slot />
    </AppLayoutSidebar>
  </div>
</template>

<script>
import AppLayoutHeader from "./components/AppLayoutHeader";
import AppLayoutSidebar from "./components/AppLayoutSidebar";

export default {
  name: "AppLayoutPrivate",
  components: { AppLayoutHeader, AppLayoutSidebar },
};
</script>
