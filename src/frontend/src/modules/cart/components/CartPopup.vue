<template>
  <div class="overlay">
    <div class="popup">
      <a class="close" @click.prevent="closePopup">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <a class="popup__button" @click.prevent="closePopup">
        <div class="button">Отлично, я жду!</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPopup",
  methods: {
    closePopup() {
      this.$emit("close-popup");
    },
  },
};
</script>

<style lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 999;
  padding: 40px;
  overflow: auto;
}
</style>
