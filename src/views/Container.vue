<template>
  <CardListComponent />
</template>

<script lang="ts">
import CardListComponent from "@/components/organisms/CardList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Container",
  components: { CardListComponent },
});
</script>
