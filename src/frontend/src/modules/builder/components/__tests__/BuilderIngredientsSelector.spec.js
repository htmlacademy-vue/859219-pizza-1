import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";

import { ingredients, sauces } from "../../../../static/pizza";
import { createMockStore } from "../../../../store/mocks";

import BuilderIngredientsSelector from "../BuilderIngredientsSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientsSelector specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Sauces is rendered correctly", () => {
    store.state.Builder.source.sauces = sauces;
    createComponent({ localVue, store });
    const label = wrapper.find("label");
    expect(label.html()).toContain("Томатный");
  });

  it("Selected sauce is changed correctly", async () => {
    createComponent({ localVue, store });
    const changePizzaSauce = jest.spyOn(wrapper.vm, "changePizzaSauce");
    const input = wrapper.find("input");
    await input.trigger("click");
    expect(changePizzaSauce).toHaveBeenCalledWith("1");
  });

  it("Ingredients is rendered correctly", () => {
    store.state.Builder.source.ingredients = ingredients;
    createComponent({ localVue, store });
    const filling = wrapper.find('[class*="filling"]');
    expect(filling.html()).toContain("Грибы");
  });
});
