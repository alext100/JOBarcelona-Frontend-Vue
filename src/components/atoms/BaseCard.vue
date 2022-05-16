<template>
  <div
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseCard",
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
      type: String,
      description: "Card shadow size. Values: sm, lg, none",
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
  background-color: #dcd5ff;
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
  &__card-lift--hover {
    &:hover {
      transform: translateY(-5px);
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
    max-width: 95vw;
    min-height: 150px;
    height: fit-content;
  }
}
</style>
