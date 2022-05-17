<template>
  <component
    :is="tag"
    class="base-tag"
    :class="[
      { shadow: shadow },
      { [`shadow-${shadowSize}`]: shadowSize },
      { [`bg-${color}`]: color },
    ]"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, VNodeTypes } from "vue";

export default defineComponent({
  name: "BaseTag",
  props: {
    tag: {
      type: String as PropType<VNodeTypes>,
      default: "span",
      description: "Html tag to use for the tag",
    },
    shadow: {
      type: Boolean,
      default: false,
      description: "Whether tag has shadow",
    },
    shadowSize: {
      type: String as PropType<"sm" | "lg" | "none">,
      description: "Card shadow size",
    },
    color: {
      type: String as PropType<"default" | "red" | "green" | "black" | "blue">,
      default: "default",
      description: "Tag background color",
    },
  },
});
</script>

<style lang="scss" scoped>
.base-tag {
  color: white;
  padding: 5px 7px 5px 7px;
  margin-right: 5px;
  border-radius: 15px;
  white-space: nowrap;
}
.bg {
  &-default {
    background-color: rgb(0, 163, 0);
  }
  &-red {
    background-color: red;
  }
  &-green {
    background-color: green;
  }
  &-black {
    background-color: #000000;
  }
  &-blue {
    background-color: blue;
  }
}
@media (max-width: 400px) {
  .base-tag {
    font-size: smaller;
  }
}
</style>
