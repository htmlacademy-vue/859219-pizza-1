<template>
  <form class="address-form sheet" @submit.prevent="submitForm">
    <div class="address-form__header">
      <b>{{ address.name || "Новый адрес" }}</b>
      <div class="address-form__edit" v-if="isEditing">
        <button
          type="button"
          class="icon"
          @click="$emit('toggle-view', $event)"
        >
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            v-model.trim="name"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            v-model.trim="street"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            v-model.trim="house"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            v-model.trim="apartment"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            v-model.trim="comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        @click="$emit('cancel', $event)"
      >
        {{ isEditing ? "Удалить" : "Отмена" }}
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";

import validator from "../../../common/mixins/validator";

export default {
  name: "ProfileAddressForm",
  mixins: [validator],
  props: {
    address: {
      type: Object,
      default: () => {
        return {
          name: "",
          street: "",
          building: "",
          flat: "",
          comment: "",
        };
      },
    },
    isEditing: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      validations: {
        name: {
          error: "",
          name: "Название адреса",
          rules: ["required"],
        },
        street: {
          name: "Улица",
          error: "",
          rules: ["required"],
        },
        house: {
          name: "Дом",
          error: "",
          rules: ["required", "number"],
        },
        apartment: {
          name: "Квартира",
          error: "",
          rules: ["number"],
        },
      },
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
    name: {
      get() {
        return this.address.name;
      },
      set(value) {
        this.setFormFieldValue({ name: "name", value });
      },
    },
    street: {
      get() {
        return this.address.street;
      },
      set(value) {
        this.setFormFieldValue({ name: "street", value });
      },
    },
    house: {
      get() {
        return this.address.building;
      },
      set(value) {
        this.setFormFieldValue({ name: "building", value });
      },
    },
    apartment: {
      get() {
        return this.address.flat;
      },
      set(value) {
        this.setFormFieldValue({ name: "flat", value });
      },
    },
    comment: {
      get() {
        return this.address.comment;
      },
      set(value) {
        this.setFormFieldValue({ name: "comment", value });
      },
    },
  },
  methods: {
    ...mapActions("Auth", ["createAddress", "updateAddress"]),
    setFormFieldValue(field) {
      this.address[field.name] = field.value;
    },
    submitForm($event) {
      if (
        !this.$validateFields(
          {
            name: this.name,
            street: this.street,
            house: this.house,
            apartment: this.apartment,
          },
          this.validations
        )
      ) {
        this.$showErrors();
        return;
      }
      this.isEditing ? this.submitEditingForm() : this.submitAddingForm();
      this.$emit("submit", $event);
    },
    submitAddingForm() {
      this.createAddress({
        userId: this.user.id,
        name: this.name,
        street: this.street,
        building: this.house,
        flat: this.apartment,
        comment: this.comment,
      });
    },
    submitEditingForm() {
      this.updateAddress({
        name: this.name,
        street: this.street,
        building: this.house,
        flat: this.apartment,
        comment: this.comment,
        ...this.address,
      });
    },
  },
};
</script>
