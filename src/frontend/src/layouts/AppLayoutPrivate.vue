<template>
  <div id="app">
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutSidebar />
      <slot />
    </main>
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
