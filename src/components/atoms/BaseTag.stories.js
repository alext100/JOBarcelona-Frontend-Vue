import BaseTag from "./BaseTag.vue";

export default {
  title: "atoms/BaseTag",
  component: BaseTag,
  argTypes: {
    tag: {
      control: { type: "select" },
      options: ["span", "div", "section"],
      description: "Html tag to use for the tag",
    },
    shadow: {
      Boolean,
      control: "inline-radio",
      options: [true, false],
      description: "Whether tag has shadow",
    },
    shadowSize: {
      control: { type: "select" },
      options: ["sm", "lg", "none", ""],
      description: "Card shadow size",
    },
    color: {
      control: { type: "select" },
      options: ["default", "red", "green", "black", "blue"],
      description: "Tag background color",
    },
  },
};

const Template = (args) => ({
  components: { BaseTag },
  setup() {
    return { args };
  },
  template: `<base-tag v-bind="args" class="mb-2"> Tag's text </base-tag>
             <base-tag v-bind="args"> in ${args.tag ? args.tag : "span"} html tag </base-tag>`,
});

export const DefaultTag = Template.bind({});
DefaultTag.args = {};

export const TagBlueShadow = Template.bind({});
TagBlueShadow.args = {
  color: "blue",
  shadow: true,
};

export const TagRedShadowLg = Template.bind({});
TagRedShadowLg.args = {
  color: "red",
  shadowSize: "lg",
};

export const TagBlackShadowSm = Template.bind({});
TagBlackShadowSm.args = {
  color: "black",
  shadowSize: "sm",
};

export const TagGreenNoShadow = Template.bind({});
TagGreenNoShadow.args = {
  color: "green",
  shadow: false,
};
