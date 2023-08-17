<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "DragItem",
  props: {
    transferData: {
      type: Object,
      required: true,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = "move";
      dataTransfer.dropEffect = "move";
      dataTransfer.setData("payload", JSON.stringify(this.transferData));
    },
  },
};
</script>
