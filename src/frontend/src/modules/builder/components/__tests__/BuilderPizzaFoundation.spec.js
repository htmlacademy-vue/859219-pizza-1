import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";

import { ingredients } from "../../../../static/pizza";
import { createMockStore } from "../../../../store/mocks";

import BuilderPizzaFoundation from "../BuilderPizzaFoundation";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaFoundation specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaFoundation, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Selected ingredients is rendered correctly", () => {
    store.state.Builder.pizza.ingredients = [{ ...ingredients[0], count: 1 }];
    createComponent({ localVue, store });
    const ingredient = wrapper.find(".pizza__filling");
    expect(ingredient.exists()).toBeTruthy();
  });
});
