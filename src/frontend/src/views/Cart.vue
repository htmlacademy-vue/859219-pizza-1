<template>
  <form class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartProductsSelector />

        <CartAdditionsSelector v-if="!isCartEmpty" />

        <div class="cart__form" v-if="!isCartEmpty">
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
      </div>
    </main>

    <section class="footer" v-if="!isCartEmpty">
      <div class="footer__more">
        <a
          class="button button--border button--arrow"
          @click.prevent="makeAnotherPizza"
        >
          Хочу еще одну
        </a>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalCost }} ₽</b>
      </div>

      <div class="footer__submit">
        <button class="button" type="submit" @click.prevent="makeOrder">
          Оформить заказ
        </button>
      </div>
    </section>

    <CartPopup v-if="showPopup" @close-popup="closePopup" />
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

import CartAdditionsSelector from "../modules/cart/components/CartAdditionsSelector";
import CartPopup from "../modules/cart/components/CartPopup";
import CartProductsSelector from "../modules/cart/components/CartProductsSelector";
import validator from "../common/mixins/validator";

export default {
  name: "Cart",
  components: {
    CartPopup,
    CartAdditionsSelector,
    CartProductsSelector,
  },
  mixins: [validator],
  data() {
    return {
      validations: {
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
      showPopup: false,
    };
  },
  computed: {
    ...mapState("Auth", ["user", "addresses"]),
    ...mapState("Cart", ["cart", "form"]),
    ...mapGetters("Auth", ["isAuthorized"]),
    ...mapGetters("Cart", ["isCartEmpty", "totalCost"]),
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
    ...mapMutations("Builder", ["resetPizza"]),
    ...mapMutations("Cart", ["setFormFieldValue", "resetCart"]),
    ...mapActions("Auth", ["fetchAddresses"]),
    ...mapActions("Orders", ["createOrder"]),
    makeAnotherPizza() {
      this.resetPizza();
      this.$router.push("/");
    },
    async makeOrder() {
      if (
        this.form.type === "new-address" &&
        !this.$validateFields(
          {
            street: this.form.street,
            house: this.form.house,
            apartment: this.form.apartment,
          },
          this.validations
        )
      ) {
        this.$showErrors();
        return;
      }
      const order = await this.createOrder({
        userId: this.user?.id || null,
        phone: this.form.tel,
        address:
          this.form.type === "self-delivery"
            ? null
            : this.form.type === "new-address"
            ? {
                street: this.form.street,
                building: this.form.house,
                flat: this.form.apartment,
                comment: this.form.comment,
              }
            : {
                id: this.form.type,
              },
        pizzas: this.cart.products.map((product) => {
          return {
            name: product.name,
            sauceId: product.sauce.id,
            doughId: product.dough.id,
            sizeId: product.size.id,
            quantity: product.count,
            ingredients: product.ingredients.map((ingredient) => {
              return {
                ingredientId: ingredient.id,
                quantity: ingredient.count,
              };
            }),
          };
        }),
        misc: this.cart.additions.map((addition) => {
          return {
            miscId: addition.id,
            quantity: addition.count,
          };
        }),
      });
      if (order) {
        this.openPopup();
        this.resetPizza();
        this.resetCart();
      }
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.$router.push(this.isAuthorized ? "/orders" : "/");
    },
  },
  mounted() {
    if (this.isAuthorized) {
      this.tel = this.user.phone;
      this.fetchAddresses();
    }
  },
};
</script>
