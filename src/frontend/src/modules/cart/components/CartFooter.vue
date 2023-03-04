<template>
  <section class="footer">
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
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "CartFooter",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Cart", ["cart", "form"]),
    ...mapGetters("Cart", ["totalCost"]),
  },
  methods: {
    ...mapMutations("Builder", ["resetPizza"]),
    ...mapMutations("Cart", ["resetCart"]),
    ...mapActions("Orders", ["createOrder"]),
    makeAnotherPizza() {
      this.resetPizza();
      this.$router.push("/");
    },
    async makeOrder() {
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
        this.$emit("open-popup");
        this.resetPizza();
        this.resetCart();
      }
    },
  },
};
</script>
