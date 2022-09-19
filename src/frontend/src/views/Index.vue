<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="" class="logo">
          <img
            src="../assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  class="dough__input"
                  v-for="dough in pizza.dough"
                  :key="dough.id"
                  :class="doughInputClass[dough.id]"
                >
                  <input
                    type="radio"
                    name="dought"
                    value="light"
                    class="visually-hidden"
                    checked
                  />
                  <b>{{ dough.name }}</b>
                  <span>{{ dough.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  class="diameter__input"
                  v-for="size in pizza.sizes"
                  :key="size.id"
                  :class="diameterInputClass[size.id]"
                >
                  <input
                    type="radio"
                    name="diameter"
                    value="normal"
                    class="visually-hidden"
                    checked
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    class="radio ingredients__input"
                    v-for="sauce in pizza.sauces"
                    :key="sauce.id"
                  >
                    <input type="radio" name="sauce" value="tomato" checked />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="ingredient in pizza.ingredients"
                      :key="ingredient.id"
                    >
                      <span
                        class="filling"
                        :class="fillingClass[ingredient.id]"
                      >
                        {{ ingredient.name }}
                      </span>

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "../static/misc.json";
import pizza from "../static/pizza.json";
import user from "../static/user.json";

export default {
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      user,
      doughInputClass: {
        1: "dough__input--light",
        2: "dough__input--large",
      },
      diameterInputClass: {
        1: "diameter__input--small",
        2: "diameter__input--normal",
        3: "diameter__input--big",
      },
      fillingClass: {
        1: "filling--mushrooms",
        2: "filling--cheddar",
        3: "filling--salami",
        4: "filling--ham",
        5: "filling--ananas",
        6: "filling--bacon",
        7: "filling--onion",
        8: "filling--chile",
        9: "filling--jalapeno",
        10: "filling--olives",
        11: "filling--tomatoes",
        12: "filling--salmon",
        13: "filling--mozzarella",
        14: "filling--parmesan",
        15: "filling--blue_cheese",
      },
    };
  },
};
</script>

<style scoped></style>
