<template>
  <b-t tag="h1" size="xl">
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
import { defineComponent, onMounted, Ref, ref } from "vue";

interface IGroup {
  groupName: string;
  groupDescription: string;
  groupTags: Array<string>;
}

export default defineComponent({
  name: "CardList",
  components: { GiftCard, HorizontalScroll, BT: BaseTypography },

  setup() {
    const { upToMediumBreakpoint } = useBreakpoints();
    const groups: Ref<IGroup[]> = ref([]);

    onMounted(() => {
      fetch("/groups.json")
        .then((response) => response.json())
        .then((data) => {
          groups.value = data.groups;
        });
    });
    return {
      groups,
      upToMediumBreakpoint,
    };
  },
});
</script>
