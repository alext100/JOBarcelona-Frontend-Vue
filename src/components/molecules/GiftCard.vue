<template>
  <div class="gift-card">
    <base-card :hover="true" shadow @handleOnClick="handleOnClick">
      <template v-slot:header>
        <b-t tag="h2" class="gift-card__header" fontWeight="bold" size="l" uppercase>
          {{ groupName }} 🥳
        </b-t>
      </template>
      <template v-slot:body>
        <b-t tag="p" class="gift-card__body" size="xs">{{ groupDescription }} 🥳</b-t>
      </template>
      <template v-slot:tags>
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
      </template>
    </base-card>
  </div>
</template>

<script lang="ts">
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseTag from "@/components/atoms/BaseTag.vue";
import BaseTypography from "@/components/atoms/BaseTypography.vue";
import useSplitText from "@/composables/useSplitText";
import { defineComponent, PropType } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "GiftCard",
  components: { BaseCard, BaseTag, BT: BaseTypography },
  setup() {
    useSplitText(".gift-card__header", "ChartsWave");
    useSplitText(".gift-card__tag", "staggerFromEnd");
  },

  props: {
    groupName: {
      type: String,
      required: true,
    },
    groupDescription: {
      type: String,
      required: true,
    },
    groupTags: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  methods: {
    ...mapActions(["actionToDispatchOnClick"]),
    handleOnClick() {
      this.actionToDispatchOnClick();
    },
  },
});
</script>

<style lang="scss" scoped>
.gift-card {
  &__header {
    display: inline;
  }
  &__header-icon {
    width: 25px;
    height: 25px;
    margin: 0 0 15px 10px;
  }
  &__body {
    display: inline;
  }
  &__body-icon {
    width: 25px;
    height: 25px;
    margin: 0 0 10px 10px;
  }
  &__tag {
    margin: 0 20px 20px 0;
  }
}
</style>
