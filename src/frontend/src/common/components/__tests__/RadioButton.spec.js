import { shallowMount } from "@vue/test-utils";

import RadioButton from "../RadioButton";

describe("RadioButton specification", () => {
  const propsData = {
    value: 1,
    checked: false,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Emit radio button change event", async () => {
    const handleChange = jest.fn();
    createComponent({ propsData, listeners: { change: handleChange } });
    const button = wrapper.find("input");
    await button.trigger("change");
    expect(handleChange).toHaveBeenCalled();
  });
});
