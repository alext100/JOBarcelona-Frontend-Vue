<template>
  <div
    @click="handleOnClick"
    @keydown="handleKeyDown"
    class="card"
    :class="[
      { 'card__card-lift--hover': hover },
      { shadow: shadow },
      { [`shadow-${shadowSize}`]: shadowSize },
    ]"
  >
    <div class="card__header" :class="headerClasses" v-if="$slots.header">
      <slot name="header"> </slot>
    </div>
    <div class="card__body" :class="bodyClasses" v-if="$slots.body">
      <slot name="body" />
    </div>
    <div class="card__tags" :class="tagsClasses" v-if="$slots.tags">
      <slot name="tags" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "BaseCard",
  emits: ["handleOnClick", "handleKeyDown"],
  props: {
    headerClasses: {
      type: [String, Object, Array],
      description: "Card header css classes",
    },
    bodyClasses: {
      type: [String, Object, Array],
      description: "Card body css classes",
    },
    tagsClasses: {
      type: [String, Object, Array],
      description: "Card tags css classes",
    },
    hover: {
      type: Boolean,
      description: "Whether card should move on hover",
    },
    shadow: {
      type: Boolean,
      description: "Whether card has shadow",
    },
    shadowSize: {
      type: String as PropType<"sm" | "lg" | "none">,
      description: "Card shadow size",
    },
  },

  methods: {
    handleOnClick() {
      this.$emit("handleOnClick");
    },
    handleKeyDown(event: KeyboardEvent) {
      if (event) {
        this.$emit("handleKeyDown");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 180px;
  border: 1px solid blue;
  background-color: #f5f6ff;
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
  &:hover {
    background-color: #dcd5ff;
  }
  &__card-lift--hover {
    &:hover {
      transform: translateY(-3px);
      transition: all 0.15s ease;
    }
  }
  &__header {
    width: fit-content;
    margin: 20px 10px 0 20px;
  }
  &__body {
    width: fit-content;
    margin: 15px 10px 0 20px;
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    margin: 15px 10px 10px 20px;
  }
}

@media (max-width: 410px) {
  .card {
    max-width: 90vw;
    min-height: 150px;
    height: fit-content;
  }
}
</style>
