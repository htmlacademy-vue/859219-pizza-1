<template>
  <div class="sign-form">
    <a href="" class="close close--white" @click.prevent="close">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="submitCredentials">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            ref="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            v-model="email"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            ref="password"
            type="password"
            name="pass"
            placeholder="***********"
            v-model="password"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import validator from "../common/mixins/validator";
import { isLoggedIn } from "../middlewares";

export default {
  name: "Login",
  middlewares: { isLoggedIn },
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          name: "E-mail",
          error: "",
          rules: ["required", "email"],
        },
        password: {
          name: "Пароль",
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    close() {
      this.$router.go(-1);
    },
    async submitCredentials() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        this.$showErrors();
        return;
      }
      const token = await this.login({
        email: this.email,
        password: this.password,
      });
      if (token) await this.$router.push("/");
    },
  },
};
</script>
