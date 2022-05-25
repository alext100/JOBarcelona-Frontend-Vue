import BaseTypography from "@/components/atoms/BaseTypography.vue";
import { cleanup } from "@testing-library/vue";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

const router = createRouterMock({});
beforeEach(() => {
  injectRouterMock(router);
});
afterEach(() => {
  cleanup();
});
enableAutoUnmount(afterEach);

describe("Given a BaseTypography component", () => {
  describe("When it is rendered with default props 'tag'", () => {
    test("Then it should render a <p> element", () => {
      const wrapper = mount(BaseTypography, {});
      const htmlString = '<p class="weight-normal" data-test="base-typography"></p>';

      const baseTypography = wrapper.find('[data-test="base-typography"]');

      expect(baseTypography.html()).toContain(htmlString);
    });
  });

  describe("When it received props with 'tag' that has value 'h1'", () => {
    test("Then it should render 'h1' element", () => {
      const wrapper = mount(BaseTypography, { props: { tag: "h1" } });
      const htmlString = '<h1 class="weight-normal" data-test="base-typography"></h1>';

      const baseTypography = wrapper.find('[data-test="base-typography"]');

      expect(baseTypography.html()).toContain(htmlString);
    });
  });

  describe("When it received props with 'italic' that has value 'true'", () => {
    test("Then it should have 'italic' class", () => {
      const wrapper = mount(BaseTypography, { props: { italic: true } });

      const baseTypography = wrapper.find('[data-test="base-typography"]');

      expect(baseTypography.classes()).toContain("italic");
    });
  });

  describe("When it received props with 'uppercase' that has value 'true'", () => {
    test("Then it should have 'uppercase' class", () => {
      const wrapper = mount(BaseTypography, { props: { uppercase: true } });

      const baseTypography = wrapper.find('[data-test="base-typography"]');

      expect(baseTypography.classes()).toContain("uppercase");
    });
  });

  describe("When it received props with user classes 'user-class-1 user-class-2'", () => {
    test("Then it should have this classes", () => {
      const wrapper = mount(BaseTypography, { props: { class: "user-class-1 user-class-2" } });

      const baseTypography = wrapper.find('[data-test="base-typography"]');

      expect(baseTypography.classes()).toContain("user-class-1");
      expect(baseTypography.classes()).toContain("user-class-2");
    });
  });

  describe("When it receives a props with 'fontWeight' with value 'bold'", () => {
    test("Then it should have class 'size-xss'", () => {
      const wrapper = mount(BaseTypography, { props: { fontWeight: "bold" } });

      const baseTypography = wrapper.find('[data-test="base-typography"]');

      expect(baseTypography.classes()).toContain("weight-bold");
    });
  });

  describe("When it receives a props with 'size' with value 'l'", () => {
    test("Then it should have class 'size-l'", () => {
      const wrapper = mount(BaseTypography, { props: { size: "l" } });

      const baseTypography = wrapper.find('[data-test="base-typography"]');

      expect(baseTypography.classes()).toContain("size-l");
    });
  });

  describe("When it receives a props with tag, size, italic, uppercase, user class, fontWeight", () => {
    test("Then it should have all the classes for this props", () => {
      const wrapper = mount(BaseTypography, {
        props: {
          tag: "h6",
          size: "xxl",
          italic: true,
          uppercase: true,
          class: "user-class",
          fontWeight: "light",
        },
      });
      const tagClasses = ["weight-light", "user-class", "italic", "uppercase", "size-xxl"];

      const baseTypography = wrapper.find('[data-test="base-typography"]');

      expect(baseTypography.classes()).toEqual(tagClasses);
    });
  });
});
