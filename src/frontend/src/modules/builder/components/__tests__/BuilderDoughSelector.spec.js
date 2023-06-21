import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";

import { dough } from "../../../../static/pizza";
import { createMockStore } from "../../../../store/mocks";

import BuilderDoughSelector from "../BuilderDoughSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderDoughSelector specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Dough is rendered correctly", () => {
    store.state.Builder.source.dough = dough;
    createComponent({ localVue, store });
    const label = wrapper.find("label");
    expect(label.html()).toContain("Тонкое");
    expect(label.html()).toContain("Из твердых сортов пшеницы");
  });

  it("Selected dough is changed correctly", async () => {
    createComponent({ localVue, store });
    const changePizzaDough = jest.spyOn(wrapper.vm, "changePizzaDough");
    const input = wrapper.find("input");
    await input.trigger("click");
    expect(changePizzaDough).toHaveBeenCalledWith("1");
  });
});
