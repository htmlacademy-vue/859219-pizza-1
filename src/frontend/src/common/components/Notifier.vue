<template>
  <div class="notifier-wrap" v-if="notifications.length">
    <div
      class="sheet notifier-message"
      v-for="notification in notifications"
      :key="notification.id"
      :class="typeClass(notification)"
      @click="removeNotification(notification.id)"
    >
      <span>{{ notification.text }}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Notifier",
  computed: mapState("Notifier", ["notifications"]),
  methods: {
    ...mapMutations("Notifier", ["removeNotification"]),
    typeClass({ type }) {
      return `notifier--${type}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/ds-system/ds-colors";

.notifier {
  &-wrap {
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 50%;
    left: 50%;
    width: 500px;
    padding: 20px;
    transform: translate(-50%);
  }

  &-message {
    box-sizing: border-box;
    width: 100%;
    margin-top: 5px;
    padding: 20px;
    text-align: center;
    background: $white;
    border: 2px solid;
    cursor: pointer;
    user-select: none;
  }

  &:first-child {
    margin-top: 0;
  }

  &--info {
    color: $purple-800;
    border-color: $purple-800;
  }

  &--error {
    color: $red-800;
    border-color: $red-800;
  }

  &--success {
    color: $green-400;
    border-color: $green-400;
  }

  &--warning {
    color: $orange-300;
    border-color: $orange-300;
  }
}
</style>
