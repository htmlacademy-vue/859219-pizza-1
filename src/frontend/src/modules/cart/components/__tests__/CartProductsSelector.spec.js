import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";

import cart from "../../../../static/cart.json";
import { createMockStore } from "../../../../store/mocks";

import CartProductsSelector from "../CartProductsSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartProductsSelector specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartProductsSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Component is rendered correctly", () => {
    store.state.Cart.cart.products = cart;
    createComponent({ localVue, store });
    const h2 = wrapper.find("h2");
    const b = wrapper.find("b");
    expect(h2.html()).toContain("С лососем");
    expect(b.html()).toContain("1800");
  });
});
