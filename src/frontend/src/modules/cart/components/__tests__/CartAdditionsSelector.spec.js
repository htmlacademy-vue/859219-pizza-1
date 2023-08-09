import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import additions from "../../../../static/misc.json";
import { createMockStore } from "../../../../store/mocks";

import CartAdditionsSelector from "../CartAdditionsSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartAdditionsSelector specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(CartAdditionsSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Component is rendered correctly", () => {
    store.state.Cart.source.additions = additions;
    createComponent({ localVue, store });
    const span = wrapper.find("span");
    const b = wrapper.find("b");
    expect(span.html()).toContain("Cola-Cola 0,5 литра");
    expect(b.html()).toContain("56 ₽");
  });
});
