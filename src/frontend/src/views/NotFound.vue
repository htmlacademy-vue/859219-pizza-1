<template>
  <div class="sign-form">
    <div class="sign-form__title">
      <h1 class="title">Страница не найдена</h1>
    </div>
    <button type="button" class="button" @click="$router.go(-1)">
      Вернуться назад
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>
