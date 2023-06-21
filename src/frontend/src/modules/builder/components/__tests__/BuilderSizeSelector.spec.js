import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";

import { sizes } from "../../../../static/pizza";
import { createMockStore } from "../../../../store/mocks";

import BuilderSizeSelector from "../BuilderSizeSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector specification", () => {
  const store = createMockStore();

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Sizes is rendered correctly", () => {
    store.state.Builder.source.sizes = sizes;
    createComponent({ localVue, store });
    const label = wrapper.find("label");
    expect(label.html()).toContain("23 см");
  });

  it("Selected size is changed correctly", async () => {
    createComponent({ localVue, store });
    const changePizzaSize = jest.spyOn(wrapper.vm, "changePizzaSize");
    const input = wrapper.find("input");
    await input.trigger("click");
    expect(changePizzaSize).toHaveBeenCalledWith("1");
  });
});
