<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div class="address-form__edit">
        <button
          type="button"
          class="icon"
          @click="$emit('toggle-view', $event)"
        >
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <p>
      ул. {{ address.street }}, д. {{ address.building }}, кв.
      {{ address.flat }}
    </p>
    <small>{{ address.comment }}</small>
  </div>
</template>

<script>
export default {
  name: "ProfileAddressCard",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
};
</script>
