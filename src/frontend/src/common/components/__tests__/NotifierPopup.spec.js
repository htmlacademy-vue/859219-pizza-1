import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import { createMockStore } from "../../../store/mocks";

import NotifierPopup from "../NotifierPopup";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("NotifierPopup specification", () => {
  const store = createMockStore();
  const errorNotification = {
    text: "Error text",
    type: "error",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(NotifierPopup, options);
  };

  afterEach(() => {
    wrapper.destroy();
    store.state.Notifier.notifications = [];
  });

  it("Component is not rendered", () => {
    createComponent({ store, localVue });
    expect(wrapper.html()).toBeFalsy();
  });

  it("Component is rendered", () => {
    store.state.Notifier.notifications = [errorNotification];
    createComponent({ store, localVue });
    expect(wrapper.html()).toBeTruthy();
  });

  it("Component is rendered correctly", () => {
    store.state.Notifier.notifications = [errorNotification];
    createComponent({ store, localVue });
    expect(wrapper.html()).toContain("notifier--error");
    expect(wrapper.html()).toContain("Error text");
  });
});
