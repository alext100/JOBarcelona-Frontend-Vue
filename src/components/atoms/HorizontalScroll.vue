<template>
  <vue-horizontal
    class="horizontal"
    :class="[{ 'is-mobile': isMobile }]"
    responsive
    :button="true"
    button-between
    :displacement="0.7"
  >
    <slot />
  </vue-horizontal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueHorizontal from "vue-horizontal";

/**
 * Horizontal Scroll component
 * @example
     <HorizontalScroll :isMobile="upToMediumBreakpoint">
      Content here
     </HorizontalScroll>
 */

export default defineComponent({
  name: "HorizontalScroll",
  components: { VueHorizontal },
  props: {
    isMobile: {
      type: Boolean,
      default: true,
      description: "Whether user device is mobile",
    },
  },
});
</script>

<style lang="scss" scoped>
.is-mobile {
  /* :deep() vue pseudo-class for styles affecting child components */
  :deep(.v-hl-container) {
    flex-direction: column;
  }
}
:deep(.v-hl-btn-next) {
  right: 26px !important;
  opacity: 0.4;
  &:hover {
    opacity: 0.7;
  }
}
:deep(.v-hl-btn-prev) {
  left: 26px !important;
  opacity: 0.5;
  &:hover {
    opacity: 0.7;
  }
}
@media (max-width: 768px) {
  :deep(.v-hl-container) {
    flex-direction: column;
  }
  :deep(.v-hl-btn) {
    display: none !important;
  }
}
</style>
