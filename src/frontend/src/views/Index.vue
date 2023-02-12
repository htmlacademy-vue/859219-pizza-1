<template>
  <AppLayout :total-price="pizzaPrice">
    <main class="content">
      <form>
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :source-dough="sourceItems.dough"
            :pizza-dough-id="pizzaItems.dough.id"
            @change-pizza-dough="changePizzaDough"
          />

          <BuilderSizeSelector
            :source-sizes="sourceItems.sizes"
            :pizza-size-id="pizzaItems.size.id"
            @change-pizza-size="changePizzaSize"
          />

          <BuilderIngredientsSelector
            :source-sauces="sourceItems.sauces"
            :source-ingredients="sourceItems.ingredients"
            :pizza-sauce-id="pizzaItems.sauce.id"
            :pizza-ingredients="pizzaItems.ingredients"
            @change-pizza-sauce="changePizzaSauce"
            @change-pizza-ingredients="changePizzaIngredients"
          />

          <BuilderPizzaView
            :pizza-items="pizzaItems"
            :pizza-name="pizzaName"
            :pizza-price="pizzaPrice"
            @change-pizza-name="changePizzaName"
            @change-pizza-ingredients="changePizzaIngredients"
          />
        </div>
      </form>
    </main>
  </AppLayout>
</template>

<script>
import AppLayout from "../layouts/AppLayout";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import pizza from "../static/pizza.json";

export default {
  name: "Index",
  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderSizeSelector,
  },
  data() {
    return {
      sourceItems: {
        dough: pizza.dough,
        sizes: pizza.sizes,
        sauces: pizza.sauces,
        ingredients: pizza.ingredients,
      },
      pizzaItems: {
        dough: { ...pizza.dough[0] },
        size: { ...pizza.sizes[0] },
        sauce: { ...pizza.sauces[0] },
        ingredients: [],
      },
      pizzaName: "",
    };
  },
  computed: {
    pizzaPrice() {
      return (
        this.pizzaItems.size.multiplier *
        (this.pizzaItems.dough.price +
          this.pizzaItems.sauce.price +
          this.getPizzaIngredientsSum(this.pizzaItems.ingredients))
      );
    },
  },
  methods: {
    changePizzaDough(id) {
      this.pizzaItems.dough = {
        ...this.sourceItems.dough.find((item) => item.id === +id),
      };
    },
    changePizzaSize(id) {
      this.pizzaItems.size = {
        ...this.sourceItems.sizes.find((item) => item.id === +id),
      };
    },
    changePizzaSauce(id) {
      this.pizzaItems.sauce = {
        ...this.sourceItems.sauces.find((item) => item.id === +id),
      };
    },
    changePizzaIngredients({ id, value }) {
      const itemIndex = this.pizzaItems.ingredients.findIndex(
        (item) => item.id === id
      );

      if (~itemIndex) {
        const item = this.pizzaItems.ingredients[itemIndex];
        const itemValue = item.value + value;

        if (itemValue === 0) {
          this.pizzaItems.ingredients.splice(itemIndex, 1);
        } else {
          item.value = itemValue;
        }
      } else {
        this.pizzaItems.ingredients.push({
          ...(this.sourceItems.ingredients.filter(
            (item) => item.id === id
          )[0] || []),
          value,
        });
      }
    },
    getPizzaIngredientsSum(items) {
      return items.reduce((sum, item) => {
        return sum + (item?.value ?? 1) * item.price;
      }, 0);
    },
    changePizzaName(value) {
      this.pizzaName = value;
    },
  },
};
</script>
