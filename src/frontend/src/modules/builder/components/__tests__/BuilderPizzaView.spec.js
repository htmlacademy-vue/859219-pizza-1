import { shallowMount } from "@vue/test-utils";

import BuilderPizzaView from "../BuilderPizzaView";

describe("BuilderPizzaView specification", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPizzaView, options);
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
    expect(wrapper.html()).toContain("content__constructor");
    expect(wrapper.html()).toContain("content__result");
  });
});
