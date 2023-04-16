import { shallowMount } from "@vue/test-utils";

import AppLayout from "../AppLayout";

describe("AppLayout specification", () => {
  const mocks = {
    $route: {
      meta: {
        layout: null,
      },
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
});
