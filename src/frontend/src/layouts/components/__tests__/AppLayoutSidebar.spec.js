import { shallowMount } from "@vue/test-utils";

import AppLayoutSidebar from "../AppLayoutSidebar";

describe("AppLayoutSidebar specification", () => {
  const stubs = ["router-link"];

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.html()).toBeTruthy();
  });

  it("Orders link is rendered correctly", async () => {
    createComponent({ stubs });
    const cartLink = wrapper.find('[to="/orders"]');
    expect(cartLink.exists()).toBeTruthy();
  });

  it("Profile link is rendered correctly", async () => {
    createComponent({ stubs });
    const profileLink = wrapper.find('[to="/profile"]');
    expect(profileLink.exists()).toBeTruthy();
  });
});
