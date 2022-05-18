// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
import BaseCard from "./BaseCard.vue";

export default {
  title: "atoms/BaseCard",
  component: BaseCard,
  argTypes: {
    shadow: {
      Boolean,
      control: "inline-radio",
      options: [true, false],
      description: "Whether card has shadow",
    },
    hover: {
      Boolean,
      control: "inline-radio",
      options: [true, false],
      description: "Whether card should move on hover",
    },
    shadowSize: {
      control: { type: "select" },
      options: ["sm", "lg", "none", ""],
      description: "Card shadow size",
    },
    headerClasses: {
      description: "Card header css classes",
      control: { type: null },
    },
    bodyClasses: {
      description: "Card body css classes",
      control: { type: null },
    },
    tagsClasses: {
      description: "Card tags css classes",
      control: { type: null },
    },
  },
};

const Template = (args) => ({
  components: { BaseCard },
  setup() {
    return {
      onClick: action("handleOnClick"),
      args,
    };
  },
  template: "<base-card v-bind='args' @click='onClick'></base-card>",
});

const TemplateWithSlots = (args) => ({
  components: { BaseCard },
  setup() {
    return {
      onClick: action("handleOnClick"),
      args,
    };
  },
  template: `<base-card v-bind='args' @click='onClick'>
               <template v-slot:header>Header</template>
               <template v-slot:body>Body text</template>
               <template v-slot:tags>Tag</template>
             </base-card>`,
});

export const Hover = Template.bind({});
Hover.args = {
  hover: true,
};

export const Shadow = Template.bind({});
Shadow.args = {
  shadow: true,
};

export const ShadowSm = Template.bind({});
ShadowSm.args = {
  shadowSize: "sm",
};

export const ShadowLg = Template.bind({});
ShadowLg.args = {
  shadowSize: "lg",
};
export const ShadowNone = Template.bind({});
ShadowNone.args = {
  shadowSize: "none",
};

export const CardWithSlots = TemplateWithSlots.bind({});
CardWithSlots.args = {};
