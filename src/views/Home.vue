<template>
  <div class="home">
    <base-card :hover="true" :shadow="true" shadowSize="md">
      <template v-slot:header>
        <h2 class="header">Crew</h2>
        <img
          src="party-popper-icon.png"
          alt="icon"
          style="width: 25px; height: 25px; display: inline"
        />
      </template>
      <template v-slot:body>
        <p class="body">Lista de regalos para el grupo Crew</p>
        <img
          src="party-popper-icon.png"
          alt="icon"
          style="width: 25px; height: 25px; display: inline"
        />
      </template>
      <template v-slot:tags>
        <base-tag tag="span" shadow>XXXX XXXXX YYYY YYY</base-tag>
        <base-tag tag="span" color="blue">XXXX XXXXX</base-tag>
      </template>
    </base-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseTag from "@/components/atoms/BaseTag.vue";

export default defineComponent({
  name: "Home",
  components: { BaseCard, BaseTag },
});
</script>

<style scoped>
.header {
  display: inline;
}
.body {
  display: inline;
}
</style>
