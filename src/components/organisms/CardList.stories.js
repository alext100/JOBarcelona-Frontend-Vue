import BaseTypography from "@/components/atoms/BaseTypography.vue";
import HorizontalScroll from "@/components/atoms/HorizontalScroll.vue";
import GiftCard from "@/components/molecules/GiftCard.vue";
import CardList from "@/components/organisms/CardList.vue";
import useBreakpoints from "@/composables/useBreakpoints";

export default {
  title: "organisms/CardList",
  component: CardList,
  subcomponents: { useBreakpoints, GiftCard },
  argTypes: {
    upToMediumBreakpoint: {
      control: { type: "boolean" },
      description: "Whether user device is mobile/tablet",
    },
    isMobile: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => ({
  components: { CardList, BaseTypography, HorizontalScroll, GiftCard, useBreakpoints },
  setup() {
    return { args };
  },
  template: `<BaseTypography v-bind="args" tag="h1" size="xl" class="m-2">
               Lista de regalos en modo de scroll {{ args.upToMediumBreakpoint ? "vertical" : "horizontal" }}
             </BaseTypography>
             <HorizontalScroll v-bind="args" :isMobile="args.upToMediumBreakpoint">
               <GiftCard
                 v-bind="args"
                 v-for="(group, index) in args.groups"
                 :key="index"
                 :groupName="group.groupName"
                 :groupDescription="group.groupDescription"
                 :groupTags="group.groupTags"
               />
             </HorizontalScroll>
             `,
});

export const CardListComponent = Template.bind({});
CardListComponent.args = {
  upToMediumBreakpoint: true,
  isMobile: false,
  groups: [
    {
      groupName: "Family",
      groupDescription: "Lista de regalos para el grupo Family",
      groupTags: ["Family", "Sport"],
    },
    {
      groupName: "Crew",
      groupDescription: "Lista de regalos para el grupo Crew",
      groupTags: ["Deportes de riesgo", "Libros"],
    },
    {
      groupName: "Otro",
      groupDescription: "Lista de regalos para el grupo Otro",
      groupTags: ["Cuadros", "Flores"],
    },
    {
      groupName: "Pareja",
      groupDescription: "Lista de regalos para el grupo Pareja",
      groupTags: ["Entradas al teatro", "Flores"],
    },
    {
      groupName: "Cocineros",
      groupDescription: "Lista de regalos para el grupo Cocineros",
      groupTags: ["Sellos para galletas", "Multicortadores"],
    },
    {
      groupName: "Niños",
      groupDescription: "Lista de regalos para el grupo Niños",
      groupTags: ["Máscara Star Wars", "Kit para fiestas"],
    },
  ],
};
