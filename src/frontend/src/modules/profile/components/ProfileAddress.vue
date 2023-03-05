<template>
  <div class="layout__address">
    <component
      :is="view"
      :address="address"
      :is-editing="isEditing"
      @toggle-view="$emit('toggle-view', $event)"
      @cancel="deleteAddress(address.id)"
      @submit="$emit('toggle-view', $event)"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import ProfileAddressCard from "./ProfileAddressCard.vue";
import ProfileAddressForm from "./ProfileAddressForm.vue";

export default {
  name: "ProfileAddress",
  components: { ProfileAddressCard, ProfileAddressForm },
  computed: {
    view() {
      return this.isEditing === this.address.id
        ? ProfileAddressForm
        : ProfileAddressCard;
    },
  },
  methods: mapActions("Auth", ["deleteAddress"]),
  props: {
    address: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Number,
      default: null,
    },
  },
};
</script>
