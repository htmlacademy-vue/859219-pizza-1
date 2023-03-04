<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <img width="72" height="72" :src="user.avatar" :alt="user.name" />
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <template v-if="addresses.length">
      <ProfileAddress
        v-for="address in addresses"
        :key="address.id"
        :address="address"
        :is-editing="isEditing"
        @toggle-view="toggleView(address)"
      />
    </template>

    <div class="sheet cart__empty" v-else>
      <p>Вы не добавили ни одного адреса</p>
    </div>

    <div class="layout__address" v-if="isAdding">
      <ProfileAddressForm
        class="address-form--opened"
        @cancel="hideAddingForm"
        @submit="hideAddingForm"
      />
    </div>

    <div class="layout__button" v-else>
      <button
        type="button"
        class="button button--border"
        @click="showAddingForm"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ProfileAddress from "../modules/builder/profile/components/ProfileAddress";
import ProfileAddressForm from "../modules/builder/profile/components/ProfileAddressForm";

export default {
  name: "Profile",
  components: { ProfileAddressForm, ProfileAddress },
  data() {
    return {
      isEditing: null,
      isAdding: false,
    };
  },
  computed: mapState("Auth", ["user", "addresses"]),
  methods: {
    ...mapActions("Auth", ["fetchAddresses"]),
    toggleView({ id }) {
      this.isEditing = this.isEditing === id ? null : id;
      this.isAdding = false;
    },
    showAddingForm() {
      this.isAdding = true;
      this.isEditing = null;
    },
    hideAddingForm() {
      this.isAdding = false;
    },
  },
  mounted() {
    this.fetchAddresses();
  },
};
</script>
