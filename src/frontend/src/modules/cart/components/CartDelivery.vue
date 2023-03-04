<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select class="select" name="type" v-model="type">
          <option value="self-delivery">Заберу сам</option>
          <option value="new-address">Новый адрес</option>
          <template v-if="isAuthorized">
            <option
              v-for="address in addresses"
              :key="address.id"
              :value="address.id"
              :selected="address.id === type"
            >
              {{ address.name }}
            </option>
          </template>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="tel"
        />
      </label>

      <div class="cart-form__address" v-if="type !== 'self-delivery'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              required
              v-model="street"
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
              required
              v-model="house"
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
              v-model="apartment"
              :disabled="isDisabled"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "CartDelivery",
  computed: {
    ...mapState("Cart", ["form"]),
    ...mapState("Auth", ["user", "addresses"]),
    ...mapGetters("Auth", ["isAuthorized"]),
    type: {
      get() {
        return this.form.type;
      },
      set(value) {
        this.setFormFieldValue({ name: "type", value });

        if (value === "new-address" || value === "self-delivery") {
          this.street = "";
          this.house = "";
          this.apartment = "";
        } else {
          const address = this.addresses.find((item) => item.id === value);

          this.street = address.street;
          this.house = address.building;
          this.apartment = address.flat;
        }
      },
    },
    tel: {
      get() {
        return this.form.tel;
      },
      set(value) {
        this.setFormFieldValue({ name: "tel", value });
      },
    },
    street: {
      get() {
        return this.form.street;
      },
      set(value) {
        this.setFormFieldValue({ name: "street", value });
      },
    },
    house: {
      get() {
        return this.form.house;
      },
      set(value) {
        this.setFormFieldValue({ name: "house", value });
      },
    },
    apartment: {
      get() {
        return this.form.apartment;
      },
      set(value) {
        this.setFormFieldValue({ name: "apartment", value });
      },
    },
    isDisabled() {
      return this.type !== "new-address";
    },
  },
  methods: {
    ...mapMutations("Cart", ["setFormFieldValue"]),
    ...mapActions("Auth", ["fetchAddresses"]),
  },
  mounted() {
    if (this.isAuthorized) {
      this.tel = this.user.phone;
      this.fetchAddresses();
    }
  },
};
</script>
