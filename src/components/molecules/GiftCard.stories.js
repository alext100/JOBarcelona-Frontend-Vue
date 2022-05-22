// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
import GiftCard from "./GiftCard.vue";

export default {
  title: "molecules/GiftCard",
  component: GiftCard,
  argTypes: {
    groupName: {
      String,
      control: { type: "text" },
      required: true,
    },
    groupDescription: {
      String,
      control: { type: "text" },
      required: true,
    },
    groupTags: {
      required: true,
    },
  },
};

const Template = (args) => ({
  components: { GiftCard },
  setup() {
    return {
      handleOnClick: action("actionToDispatchOnClick"),
      args,
    };
  },
  template: `<GiftCard v-bind="args" @handleOnClick="handleOnClick" />`,
});

export const GiftCardComponent = Template.bind({});
GiftCardComponent.args = {
  groupName: "Family",
  groupDescription: "Lista de regalos para el grupo Family",
  groupTags: ["Family", "Sport"],
};

GiftCardComponent.parameters = { jest: "GiftCard.spec.ts" };
