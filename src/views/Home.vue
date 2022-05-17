<template>
  <div class="home">
    <base-card :hover="true" :shadow="true" shadowSize="lg">
      <template v-slot:header>
        <b-t tag="h2" class="header" fontWeight="bold" italic size="l" uppercase>Crew</b-t>
        <img
          src="party-popper-icon.png"
          alt="icon"
          style="width: 25px; height: 25px; display: inline"
        />
      </template>
      <template v-slot:body>
        <b-t tag="p" class="body">Lista de regalos para el grupo Crew</b-t>
        <img
          src="party-popper-icon.png"
          alt="icon"
          style="width: 25px; height: 25px; display: inline"
        />
      </template>
      <template v-slot:tags>
        <base-tag tag="span" shadow shadowSize="sm">XXXX XXXXX YYYY YYY</base-tag>
        <base-tag tag="span" color="blue">XXXX XXXXX</base-tag>
      </template>
    </base-card>
  </div>
</template>

<script lang="ts">
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseTag from "@/components/atoms/BaseTag.vue";
import BaseTypography from "@/components/atoms/BaseTypography.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { BaseCard, BaseTag, BT: BaseTypography },
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
