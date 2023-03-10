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
    <div class="header__user" v-if="isAuthorized">
      <router-link to="/profile">
        <picture>
          <source type="image/webp" :srcset="avatarSet([1, 2], true)" />
          <img
            width="32"
            height="32"
            :src="user.avatar"
            :srcset="avatarSet([2])"
            :alt="user.name"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a href="" class="header__logout" @click.prevent="exit">
        <span>Выйти</span>
      </a>
    </div>
    <div class="header__user" v-else>
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["isAuthorized", "avatarSet"]),
    ...mapGetters("Cart", ["totalCost"]),
  },
  methods: {
    ...mapActions("Auth", ["logout"]),
    async exit() {
      await this.logout();
      await this.$router.push("/login");
      this.$notifier.success("Вы успешно вышли");
    },
  },
};
</script>
