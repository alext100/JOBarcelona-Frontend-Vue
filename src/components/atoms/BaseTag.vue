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

/**
 * Base Tag component
 * @example
      <base-tag
          v-for="(tag, index) in groupTags"
          :key="index"
          class="gift-card__tag"
          tag="span"
          shadow
          shadowSize="sm"
        >
          {{ tag }}
      </base-tag>
 */

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
  padding: 3px 10px 3px 10px;
  margin-right: 5px;
  border-radius: 15px;
  white-space: nowrap;
  font-size: large;
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
    font-size: medium;
  }
}
</style>
