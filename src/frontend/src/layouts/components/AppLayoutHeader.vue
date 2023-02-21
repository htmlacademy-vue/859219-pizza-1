<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="../../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ totalCost }} ₽</router-link>
    </div>
    <div v-if="isAuthorized" class="header__user">
      <router-link to="/profile">
        <img width="32" height="32" :src="user.avatar" :alt="user.name" />
        <span>{{ user.name }}</span>
      </router-link>
      <router-link to="/login" class="header__logout">
        <span>Выйти</span>
      </router-link>
    </div>
    <div v-else class="header__user">
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["isAuthorized"]),
    ...mapGetters("Cart", ["totalCost"]),
  },
};
</script>
