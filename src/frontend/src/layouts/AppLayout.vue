<template>
  <component :is="layout">
    <Notifier />
    <slot />
  </component>
</template>

<script>
import Notifier from "../common/components/Notifier";

const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  components: { Notifier },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;

      return () => import(`@/layouts/${layout}.vue`);
    },
  },
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
};
</script>
