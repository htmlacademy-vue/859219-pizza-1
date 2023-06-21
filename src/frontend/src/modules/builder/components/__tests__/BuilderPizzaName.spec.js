import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";

import { createMockStore } from "../../../../store/mocks";

import BuilderPizzaName from "../BuilderPizzaName";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaName specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaName, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Component is rendered correctly", () => {
    store.state.Builder.pizza.name = "Пеперони";
    createComponent({ localVue, store });
    expect(wrapper.find("input").element.value).toBe("Пеперони");
  });
});
