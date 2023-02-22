<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select class="select" name="type" v-model="typeValue">
          <option value="self-delivery">Заберу сам</option>
          <option value="new-address">Новый адрес</option>
          <option
            v-show="isAuthorized"
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
            :selected="address.id === typeValue"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="telValue"
        />
      </label>

      <div class="cart-form__address" v-if="typeValue !== 'self-delivery'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              v-model="streetValue"
              :disabled="isDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              v-model="houseValue"
              :disabled="isDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              v-model="apartmentValue"
              :disabled="isDisabled"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "CartDelivery",
  computed: {
    ...mapState("Cart", ["form"]),
    ...mapState("Auth", ["addresses"]),
    ...mapGetters("Auth", ["isAuthorized"]),
    typeValue: {
      get() {
        return this.form.type;
      },
      set(value) {
        this.setFormFieldValue({ name: "type", value });

        if (value === "new-address" || value === "self-delivery") {
          this.setFormFieldValue({ name: "street", value: "" });
          this.setFormFieldValue({ name: "house", value: "" });
          this.setFormFieldValue({ name: "apartment", value: "" });
        } else {
          const address = this.addresses.find((item) => item.id === value);

          this.setFormFieldValue({ name: "street", value: address.street });
          this.setFormFieldValue({ name: "house", value: address.building });
          this.setFormFieldValue({ name: "apartment", value: address.flat });
        }
      },
    },
    telValue: {
      get() {
        return this.form.tel;
      },
      set(value) {
        this.setFormFieldValue({ name: "tel", value });
      },
    },
    streetValue: {
      get() {
        return this.form.street;
      },
      set(value) {
        this.setFormFieldValue({ name: "street", value });
      },
    },
    houseValue: {
      get() {
        return this.form.house;
      },
      set(value) {
        this.setFormFieldValue({ name: "house", value });
      },
    },
    apartmentValue: {
      get() {
        return this.form.apartment;
      },
      set(value) {
        this.setFormFieldValue({ name: "apartment", value });
      },
    },
    isDisabled() {
      return this.typeValue !== "new-address";
    },
  },
  methods: mapMutations("Cart", ["setFormFieldValue"]),
};
</script>
