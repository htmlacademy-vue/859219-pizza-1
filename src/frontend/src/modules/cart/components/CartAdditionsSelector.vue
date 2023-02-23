<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="addition of source.additions"
        :key="addition.id"
      >
        <p class="additional-list__description">
          <img
            width="39"
            height="60"
            :src="addition.image"
            :alt="addition.name"
          />
          <span>{{ addition.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            class="counter--orange additional-list__counter"
            :item="addition"
            :items="cart.additions"
            @change-counter-value="changeCartAdditions"
          />
          <div class="additional-list__price">
            <b>× {{ addition.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import ItemCounter from "../../../common/components/ItemCounter";

export default {
  name: "CartAdditionsSelector",
  components: { ItemCounter },
  computed: mapState("Cart", ["source", "cart"]),
  methods: mapMutations("Cart", ["changeCartAdditions"]),
};
</script>
