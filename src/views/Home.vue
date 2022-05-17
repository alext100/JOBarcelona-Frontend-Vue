<template>
  <GiftCard
    groupName="Family"
    groupDescription="Lista de regalos para el grupo Family"
    :groupTags="['Family', 'Sport']"
  />
</template>

<script lang="ts">
import GiftCard from "@/components/molecules/GiftCard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { GiftCard },
});
</script>

<style scoped></style>
