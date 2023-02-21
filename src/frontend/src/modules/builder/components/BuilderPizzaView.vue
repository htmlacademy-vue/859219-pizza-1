<template>
  <div class="content__pizza">
    <BuilderPizzaName />

    <div class="content__constructor">
      <BuilderPizzaFoundation />
    </div>

    <div class="content__result">
      <BuilderPriceCounter />
      <BuilderButton />
    </div>
  </div>
</template>

<script>
import BuilderPizzaFoundation from "./BuilderPizzaFoundation";
import BuilderPizzaName from "./BuilderPizzaName";
import BuilderPriceCounter from "./BuilderPriceCounter";
import BuilderButton from "./BuilderButton";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPizzaFoundation,
    BuilderPizzaName,
    BuilderPriceCounter,
    BuilderButton,
  },
};
</script>
