import { shallowMount } from "@vue/test-utils";

import addresses from "../../../../static/addresses.json";

import ProfileAddressCard from "../ProfileAddressCard";

describe("ProfileAddressCard specification", () => {
  const propsData = {
    address: addresses[1],
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ProfileAddressCard, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toBeTruthy();
  });

  it("Component ProfileAddressCard is rendered correctly", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain("Офис");
    expect(wrapper.html()).toContain("Строителей");
    expect(wrapper.html()).toContain("Спросить Василия");
  });
});
