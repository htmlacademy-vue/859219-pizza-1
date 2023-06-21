import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import { createMockStore } from "../../../../store/mocks";

import BuilderButton from "../BuilderButton";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderButton specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Button is disabled", () => {
    createComponent({ localVue, store });
    expect(wrapper.attributes("disabled")).toBeTruthy();
  });

  it("Button is active", () => {
    store.state.Builder.pizza.name = "Пеперони";
    store.state.Builder.pizza.ingredients = [{}, {}, {}];
    createComponent({ localVue, store });
    expect(wrapper.attributes("disabled")).toBeFalsy();
  });
});
