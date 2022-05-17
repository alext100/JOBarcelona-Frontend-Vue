<template>
  <HorizontalScroll :isMobile="$isMobile()">
    <GiftCard
      v-for="(group, index) in groups || []"
      :key="index"
      :groupName="group.groupName"
      :groupDescription="group.groupDescription"
      :groupTags="group.groupTags"
    />
  </HorizontalScroll>
</template>

<script lang="ts">
import HorizontalScroll from "@/components/atoms/HorizontalScroll.vue";
import GiftCard from "@/components/molecules/GiftCard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardList",
  components: { GiftCard, HorizontalScroll },

  data() {
    return {
      groups: [
        {
          groupName: "",
          groupDescription: "",
          groupTags: [],
        },
      ],
      isMobile: false,
    };
  },

  created() {
    fetch("/groups.json")
      .then((response) => response.json())
      .then((data) => {
        this.groups = data.groups;
      });
  },
});
</script>
