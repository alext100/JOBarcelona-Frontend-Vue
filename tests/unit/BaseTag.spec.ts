import BaseTag from "@/components/atoms/BaseTag.vue";
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

describe("Given a BaseTag component", () => {
  describe("When it is rendered with default props 'tag'", () => {
    test("Then it should render a span element with 'base-tag' class", () => {
      const wrapper = mount(BaseTag, {});
      const baseTag = wrapper.find(".base-tag");
      const htmlStringWithElement = '<span class="base-tag bg-default"></span>';

      expect(baseTag.html()).toContain(htmlStringWithElement);
    });
  });

  describe("When it is receives props 'tag' with value 'div'", () => {
    test("Then it should render a div element with 'base-tag' class", () => {
      const wrapper = mount(BaseTag, {
        props: { tag: "div" },
      });
      const baseTag = wrapper.find(".base-tag");
      const htmlStringWithElement = '<div class="base-tag bg-default"></div>';

      expect(baseTag.html()).toContain(htmlStringWithElement);
    });
  });

  describe("When it receives a props 'shadow' with true value", () => {
    test("Then it should have class 'shadow'", () => {
      const wrapper = mount(BaseTag, { props: { shadow: true } });

      const baseTag = wrapper.find(".base-tag");

      expect(baseTag.classes()).toContain("shadow");
    });
  });

  describe("When it receives a props 'shadowSize' with value 'sm'", () => {
    test("Then it should have class 'shadow-sm'", () => {
      const wrapper = mount(BaseTag, { props: { shadowSize: "sm" } });

      const baseTag = wrapper.find(".base-tag");

      expect(baseTag.classes()).toContain("shadow-sm");
    });
  });

  describe("When it receives a props 'shadowSize' with value 'lg'", () => {
    test("Then it should have class 'shadow-lg'", () => {
      const wrapper = mount(BaseTag, { props: { shadowSize: "lg" } });

      const baseTag = wrapper.find(".base-tag");

      expect(baseTag.classes()).toContain("shadow-lg");
    });
  });

  describe("When it receives a props 'shadowSize' with value 'none'", () => {
    test("Then it should have class 'shadow-none'", () => {
      const wrapper = mount(BaseTag, { props: { shadowSize: "none" } });

      const baseTag = wrapper.find(".base-tag");

      expect(baseTag.classes()).toContain("shadow-none");
    });
  });

  describe("When it receives a props 'color' with value red", () => {
    test("Then it should have class 'bg-red'", () => {
      const wrapper = mount(BaseTag, { props: { color: "red" } });

      const baseTag = wrapper.find(".base-tag");

      expect(baseTag.classes()).toContain("bg-red");
    });
  });
});
