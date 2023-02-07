<template>
  <AppLayout>
    <main class="content">
      <form>
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :items="items"
            :selected-items="selectedItems"
            @change-selected-item="changeSelectedItem"
          />

          <BuilderSizeSelector
            :items="items"
            :selected-items="selectedItems"
            @change-selected-item="changeSelectedItem"
          />

          <BuilderIngredientsSelector
            :items="items"
            :selected-items="selectedItems"
            @change-selected-item="changeSelectedItem"
          />

          <BuilderPizzaView
            :items="items"
            :selected-items="selectedItems"
            v-model="pizzaName"
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
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderDoughSelector,
    BuilderSizeSelector,
  },
  data() {
    return {
      items: {
        dough: pizza.dough,
        size: pizza.sizes,
        sauce: pizza.sauces,
        ingredients: pizza.ingredients,
      },
      selectedItems: {
        dough: { ...pizza.dough[0] },
        size: { ...pizza.sizes[0] },
        sauce: { ...pizza.sauces[0] },
        ingredients: [],
      },
      pizzaName: "",
    };
  },
  methods: {
    changeSelectedItem({ name, id, value = null }) {
      if (value) {
        const itemIndex = this.selectedItems[name].findIndex(
          (item) => item.id === id
        );

        if (~itemIndex) {
          const item = this.selectedItems[name][itemIndex];
          const itemValue = item.value + value;

          if (itemValue === 0) {
            this.selectedItems[name].splice(itemIndex, 1);
          } else {
            item.value = itemValue;
          }
        } else {
          this.selectedItems[name].push({
            ...(this.items[name].filter((item) => item.id === id)[0] || []),
            value,
          });
        }
      } else {
        this.selectedItems[name] = {
          ...this.items[name].find((item) => item.id === +id),
        };
      }
    },
  },
};
</script>
