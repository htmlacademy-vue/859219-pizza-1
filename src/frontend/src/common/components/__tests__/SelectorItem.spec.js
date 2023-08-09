import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import { createMockStore } from "../../../store/mocks";

import SelectorItem from "../SelectorItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("SelectorItem specification", () => {
  const store = createMockStore();

  const propsData = {
    ingredient: {
      id: 1,
      name: "Грибы",
      image: "/public/img/filling/mushrooms.svg",
      price: 33,
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(SelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ propsData, store, localVue });
    expect(wrapper.html()).toBeTruthy();
  });

  it("Component is rendered correctly", () => {
    createComponent({ propsData, store, localVue });
    expect(wrapper.html()).toContain("filling--mushrooms");
    expect(wrapper.html()).toContain("Грибы");
  });
});
