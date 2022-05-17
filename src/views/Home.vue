<template>
  <cards-component> </cards-component>
</template>

<script lang="ts">
import CardsComponent from "@/components/organisms/CardList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { CardsComponent },
});
</script>

<style scoped></style>
