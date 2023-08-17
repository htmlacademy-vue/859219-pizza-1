<template>
  <component :is="layout">
    <NotifierPopup />
    <slot />
  </component>
</template>

<script>
import NotifierPopup from "../common/components/NotifierPopup";

const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  components: { NotifierPopup },
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;

      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
