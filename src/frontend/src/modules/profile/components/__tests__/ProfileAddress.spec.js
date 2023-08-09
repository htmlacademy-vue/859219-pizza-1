import { mount } from "@vue/test-utils";

import addresses from "../../../../static/addresses.json";

import ProfileAddress from "../ProfileAddress";

describe("ProfileAddress specification", () => {
  const propsData = {
    address: addresses[1],
    isEditing: 1,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(ProfileAddress, options);
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
    const formButtons = wrapper.find('[class="address-form__buttons"]');
    expect(formButtons.exists()).toBeTruthy();
  });

  it("Component ProfileAddressCard is rendered correctly", () => {
    propsData.isEditing = 2;
    createComponent({ propsData });
    const formButtons = wrapper.find('[class="address-form__buttons"]');
    expect(formButtons.exists()).toBeFalsy();
  });
});
