<template>
  <component :is="$props.tag" :class="classes">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

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
    font-weight: bold;
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
    font-size: calc(1rem + 0.9vw);
  }
  &-xs {
    font-size: calc(1.1rem + 0.9vw);
  }
  &-s {
    font-size: calc(1.2rem + 0.9vw);
  }
  &-l {
    font-size: calc(1.5rem + 0.9vw);
  }
  &-xl {
    font-size: calc(1.7rem + 0.9vw);
  }
  &-xxl {
    font-size: calc(2rem + 0.9vw);
  }
}
.italic {
  font-style: italic;
}
.uppercase {
  text-transform: uppercase;
}
</style>
