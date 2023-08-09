import { shallowMount } from "@vue/test-utils";

import addresses from "../../../../static/addresses.json";

import ProfileAddressForm from "../ProfileAddressForm";

describe("ProfileAddressForm specification", () => {
  const propsData = {
    address: addresses[1],
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ProfileAddressForm, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toBeTruthy();
  });

  it("Component ProfileAddressForm is rendered correctly", () => {
    createComponent({ propsData });
    expect(wrapper.find('[name="addr-name"]').element.value).toBe("Офис");
    expect(wrapper.find('[name="addr-street"]').element.value).toBe(
      "Строителей"
    );
    expect(wrapper.find('[name="addr-comment"]').element.value).toBe(
      "Спросить Василия"
    );
  });
});
