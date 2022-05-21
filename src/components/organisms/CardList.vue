<template>
  <b-t tag="h1" size="xl" class="m-2" data-test="card-list-header">
    Lista de regalos en modo de scroll {{ upToMediumBreakpoint ? "vertical" : "horizontal" }}
  </b-t>
  <HorizontalScroll :isMobile="upToMediumBreakpoint">
    <GiftCard
      v-for="(group, index) in groups"
      :key="index"
      :groupName="group.groupName"
      :groupDescription="group.groupDescription"
      :groupTags="group.groupTags"
    />
  </HorizontalScroll>
</template>

<script lang="ts">
import BaseTypography from "@/components/atoms/BaseTypography.vue";
import HorizontalScroll from "@/components/atoms/HorizontalScroll.vue";
import GiftCard from "@/components/molecules/GiftCard.vue";
import useBreakpoints from "@/composables/useBreakpoints";
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

/**
 * Card List Component
 * @example
     <CardListComponent />
 */

interface IGroup {
  groupName: string;
  groupDescription: string;
  groupTags: Array<string>;
}

export default defineComponent({
  name: "CardList",
  components: { GiftCard, HorizontalScroll, BT: BaseTypography },

  setup() {
    const { state, dispatch } = useStore();
    const { upToMediumBreakpoint } = useBreakpoints();
    const groups: ComputedRef<IGroup[]> = computed(() => state.groups);

    onMounted(() => {
      dispatch("getGroups");
    });

    return {
      groups,
      upToMediumBreakpoint,
    };
  },
});
</script>
