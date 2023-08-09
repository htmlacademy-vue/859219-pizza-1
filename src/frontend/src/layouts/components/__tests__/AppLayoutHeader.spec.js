import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";

import user from "../../../static/user";
import { createMockStore } from "../../../store/mocks";

import AppLayoutHeader from "../AppLayoutHeader";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayoutHeader specification", () => {
  const store = createMockStore();
  const stubs = ["router-link"];

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.html()).toBeTruthy();
  });

  it("Cart link is rendered correctly", async () => {
    createComponent({ localVue, store, stubs });
    const cartLink = wrapper.find('[to="/cart"]');
    expect(cartLink.exists()).toBeTruthy();
    expect(cartLink.html()).toContain(`${store.getters["Cart/totalCost"]} ₽`);
  });

  it("Login link is rendered correctly", async () => {
    createComponent({ localVue, store, stubs });
    const loginLink = wrapper.find('[class="header__login"]');
    expect(loginLink.exists()).toBeTruthy();
  });

  it("Profile link is rendered correctly", async () => {
    store.state.Auth.user = user;
    createComponent({ localVue, store, stubs });
    const profileLink = wrapper.find('[to="/profile"]');
    expect(profileLink.exists()).toBeTruthy();
    expect(profileLink.html()).toContain(store.state.Auth.user.name);
  });

  it("Logout button is rendered correctly", async () => {
    store.state.Auth.user = user;
    createComponent({ localVue, store, stubs });
    const logoutLink = wrapper.find('[class="header__logout"]');
    expect(logoutLink.exists()).toBeTruthy();
  });
});
