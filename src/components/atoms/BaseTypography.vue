<template>
  <component :is="$props.tag" :class="classes">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

/**
 * Base Typography component
 * @example
  <BaseTypography tag="h2" class="gift-card__header" fontWeight="bold" size="l" uppercase>
    Some text content here
  <BaseTypography />
 */

export default defineComponent({
  name: "BaseTypography",
  props: {
    tag: {
      type: String as PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p">,
      default: "p",
      description: "Html tag to use for the tag",
    },
    italic: {
      type: Boolean,
      default: false,
      description: "Whether font style is italic",
    },
    uppercase: {
      type: Boolean,
      default: false,
      description: "Whether font style is uppercase",
    },
    class: {
      type: String,
      default: "",
      description: "User classes",
    },
    fontWeight: {
      type: String as PropType<"bold" | "light" | "normal">,
      default: "normal",
      description: "Font weight",
    },
    size: {
      type: String as PropType<"xxs" | "xs" | "s" | "l" | "xl" | "xxl">,
      default: "",
      description: "Font size",
    },
  },
  setup(props) {
    const classes = computed(
      () =>
        `${props.fontWeight ? [`weight-${props.fontWeight}`] : ""} ` +
        `${props.class} ` +
        `${props.italic ? "italic " : ""}` +
        `${props.uppercase ? "uppercase " : ""}` +
        `${props.size ? [`size-${props.size}`] : ""}`
    );

    return { classes };
  },
});
</script>

<style lang="scss" scoped>
.weight {
  &-bold {
    font-weight: 600;
  }
  &-light {
    font-weight: 300;
  }
  &-normal {
    font-weight: 400;
  }
}
.size {
  &-xxs {
    font-size: clamp(14px, calc(0.6rem + 0.9vw), 16px);
  }
  &-xs {
    font-size: clamp(16px, calc(0.9rem + 0.9vw), 18px);
  }
  &-s {
    font-size: clamp(19px, calc(1rem + 0.9vw), 22px);
  }
  &-l {
    font-size: clamp(24px, calc(1.3rem + 0.9vw), 28px);
  }
  &-xl {
    font-size: clamp(28px, calc(1.5rem + 0.9vw), 32px);
  }
  &-xxl {
    font-size: clamp(32px, calc(1.7rem + 0.9vw), 36px);
  }
}
.italic {
  font-style: italic;
}
.uppercase {
  text-transform: uppercase;
}
</style>
