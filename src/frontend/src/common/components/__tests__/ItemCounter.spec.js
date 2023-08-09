import { shallowMount } from "@vue/test-utils";

import { MAX_INGREDIENT_COUNT } from "../../constants";

import ItemCounter from "../ItemCounter";

describe("ItemCounter specification", () => {
  const propsData = {
    item: {
      id: 1,
      name: "Грибы",
      image: "/public/img/filling/mushrooms.svg",
      price: 33,
    },
    items: [
      {
        id: 1,
        name: "Грибы",
        image: "/public/img/filling/mushrooms.svg",
        price: 33,
        count: 1,
      },
      {
        id: 2,
        name: "Чеддер",
        image: "/public/img/filling/cheddar.svg",
        price: 42,
      },
    ],
    maxValue: MAX_INGREDIENT_COUNT,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Initial counter value", () => {
    createComponent({ propsData });
    expect(wrapper.find("[class='counter__input']").element.value).toBe(
      propsData.items[0].count.toString()
    );
  });

  it("Emit minus counter button change event", async () => {
    createComponent({ propsData });
    const button = wrapper.find("[class*='counter__button--minus']");
    await button.trigger("click");
    expect(wrapper.emitted("change-counter-value")).toBeTruthy();
  });

  it("Emit plus counter button change event", async () => {
    createComponent({ propsData });
    const button = wrapper.find("[class*='counter__button--plus']");
    await button.trigger("click");
    expect(wrapper.emitted("change-counter-value")).toBeTruthy();
  });

  it("Minus counter button is active", () => {
    createComponent({ propsData });
    const button = wrapper.find("[class*='counter__button--minus']");
    expect(button.attributes("disabled")).toBeFalsy();
  });

  it("Plus counter button is active", () => {
    createComponent({ propsData });
    const button = wrapper.find("[class*='counter__button--plus']");
    expect(button.attributes("disabled")).toBeFalsy();
  });

  it("Minus counter button is disabled", () => {
    createComponent({ propsData: { ...propsData, items: [] } });
    const button = wrapper.find("[class*='counter__button--minus']");
    expect(button.attributes("disabled")).toBeTruthy();
  });

  it("Plus counter button is disabled", () => {
    createComponent({
      propsData: {
        ...propsData,
        items: [{ ...propsData.items[0], count: MAX_INGREDIENT_COUNT }],
      },
    });
    const button = wrapper.find("[class*='counter__button--plus']");
    expect(button.attributes("disabled")).toBeTruthy();
  });
});
