import BaseTypography from "./BaseTypography.vue";

export default {
  title: "atoms/BaseTypography",
  component: BaseTypography,
  argTypes: {
    tag: {
      control: { type: "radio" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
      description: "Html tag to use for the tag",
    },
    italic: {
      Boolean,
      control: "inline-radio",
      options: [true, false],
      description: "Whether font style is italic",
    },
    uppercase: {
      Boolean,
      control: "inline-radio",
      options: [true, false],
      description: "Whether font style is uppercase",
    },
    fontWeight: {
      control: { type: "select" },
      default: "normal",
      options: ["bold", "light", "normal"],
      description: "Font weight",
    },
    size: {
      control: { type: "select" },
      default: "",
      options: ["", "xxs", "xs", "s", "l", "xl", "xxl"],
      description: "Font size",
    },
    class: {
      description: "User classes",
      control: { type: null },
    },
  },
};

const Template = (args) => ({
  components: { BaseTypography },
  setup() {
    return { args };
  },
  template: `<BaseTypography v-bind="args">
               Some example text in ${args.tag} html tag.
               Chosen text size is ${args.size ? args.size : "default"}
             </BaseTypography>`,
});

export const h1 = Template.bind({});
h1.args = { tag: "h1" };
h1.storyName = "h1";

export const h2 = Template.bind({});
h2.args = { tag: "h2" };
h2.storyName = "h2";

export const h3 = Template.bind({});
h3.args = { tag: "h3" };
h3.storyName = "h3";

export const h4 = Template.bind({});
h4.args = { tag: "h4" };
h4.storyName = "h4";

export const h5 = Template.bind({});
h5.args = { tag: "h5" };
h5.storyName = "h5";

export const h6 = Template.bind({});
h6.args = { tag: "h6" };
h6.storyName = "h6";

export const p = Template.bind({});
p.args = { tag: "p" };
p.storyName = "p";
