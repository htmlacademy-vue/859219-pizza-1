import { shallowMount } from "@vue/test-utils";

import CartPopup from "../CartPopup";

describe("CartPopup specification", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(CartPopup, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Component is rendered correctly", () => {
    createComponent();
    const h2 = wrapper.find("h2");
    const p = wrapper.find("p");
    expect(h2.html()).toContain("Спасибо за заказ");
    expect(p.html()).toContain("Мы начали готовить Ваш заказ");
  });
});
