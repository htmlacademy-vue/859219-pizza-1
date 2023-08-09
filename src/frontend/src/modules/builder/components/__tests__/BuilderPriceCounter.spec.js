import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";

import { dough, sizes, sauces } from "../../../../static/pizza";
import { createMockStore } from "../../../../store/mocks";

import BuilderPriceCounter from "../BuilderPriceCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Price counter is rendered correctly", () => {
    store.state.Builder.pizza.dough = dough[0];
    store.state.Builder.pizza.size = sizes[0];
    store.state.Builder.pizza.sauce = sauces[0];
    store.state.Builder.pizza.ingredients = [];
    createComponent({ localVue, store });
    const p = wrapper.find("p");
    expect(p.html()).toContain(`${store.getters["Builder/pizzaCost"]} ₽`);
  });
});
