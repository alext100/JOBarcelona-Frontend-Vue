import HorizontalScroll from "@/components/atoms/HorizontalScroll.vue";
import VueHorizontal from "vue-horizontal";
import { cleanup } from "@testing-library/vue";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { h } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

const router = createRouterMock({});
beforeEach(() => {
  injectRouterMock(router);
});
afterEach(() => {
  cleanup();
});
enableAutoUnmount(afterEach);

describe("Given a HorizontalScroll component", () => {
  describe("When it is rendered", () => {
    test("Then it should render a <div> container with classes 'horizontal', 'is-mobile'", () => {
      const wrapper = mount(HorizontalScroll, {
        components: { VueHorizontal },
      });

      const horizontal = wrapper.find(".horizontal");

      expect(horizontal.exists()).toBe(true);
      expect(horizontal.classes()).toContain("is-mobile");
    });
  });

  describe("When it receives props with isMobile that has value false", () => {
    test("Then it should not contain the class 'is-mobile'", () => {
      const wrapper = mount(HorizontalScroll, {
        props: { isMobile: false },
        components: { VueHorizontal },
      });

      const horizontal = wrapper.find(".horizontal");

      expect(horizontal.classes()).not.toContain("is-mobile");
    });
  });

  describe("When the component is rendered with slot", () => {
    test("Then it should contain content from this slot", () => {
      const wrapper = mount(HorizontalScroll, {
        components: { VueHorizontal },
        slots: { default: h("section", {}, "Some content") },
      });

      expect(wrapper.html()).toContain("Some content");
    });
  });
});
