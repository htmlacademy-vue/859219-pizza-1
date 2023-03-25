import { shallowMount } from "@vue/test-utils";

import ProductCard from "../ProductCard";

describe("ProductCard specification", () => {
  const propsData = {
    product: {
      id: "pizza-2",
      price: 1536,
      count: 1,
      dough: {
        id: 1,
        name: "Тонкое",
        image: "/public/img/dough-light.svg",
        description: "Из твердых сортов пшеницы",
        price: 300,
      },
      size: {
        id: 2,
        name: "45 см",
        image: "/public/img/diameter.svg",
        multiplier: 3,
      },
      sauce: { id: 2, name: "Сливочный", price: 50 },
      ingredients: [
        {
          id: 6,
          name: "Пармезан",
          image: "/public/img/filling/parmesan.svg",
          price: 35,
          count: 1,
        },
        {
          id: 2,
          name: "Чеддер",
          image: "/public/img/filling/cheddar.svg",
          price: 42,
          count: 1,
        },
        {
          id: 9,
          name: "Блю чиз",
          image: "/public/img/filling/blue_cheese.svg",
          price: 50,
          count: 1,
        },
        {
          id: 5,
          name: "Моцарелла",
          image: "/public/img/filling/mozzarella.svg",
          price: 35,
          count: 1,
        },
      ],
      name: "4 сыра",
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ProductCard, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Component is rendered", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toBeTruthy();
  });

  it("Component is rendered correctly", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain("4 сыра");
    expect(wrapper.html()).toContain(
      "Начинка: пармезан, чеддер, блю чиз, моцарелла"
    );
  });
});
