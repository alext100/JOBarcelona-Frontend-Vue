import BaseCard from "@/components/atoms/BaseCard.vue";
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

describe("Given a BaseCard Component", () => {
  describe("When it is rendered", () => {
    test("Then it should render a div element with '.card' class", () => {
      const wrapper = mount(BaseCard, {});

      const card = wrapper.find(".card");

      expect(card.exists()).toBe(true);
    });
  });

  describe("When it receives a props 'hover' with true value", () => {
    test("Then it should have class 'card__card-lift--hover'", () => {
      const wrapper = mount(BaseCard, { props: { hover: true } });

      const card = wrapper.find(".card");

      expect(card.classes()).toContain("card__card-lift--hover");
    });
  });

  describe("When it receives a props 'shadow' with true value", () => {
    test("Then it should have class 'shadow'", () => {
      const wrapper = mount(BaseCard, { props: { shadow: true } });

      const card = wrapper.find(".card");

      expect(card.classes()).toContain("shadow");
    });
  });

  describe("When it receives a props 'shadowSize' with value 'sm'", () => {
    test("Then it should have class 'shadow-sm'", () => {
      const wrapper = mount(BaseCard, { props: { shadowSize: "sm" } });

      const card = wrapper.find(".card");

      expect(card.classes()).toContain("shadow-sm");
    });
  });

  describe("When it receives a props 'shadowSize' with value 'lg'", () => {
    test("Then it should have class 'shadow-lg'", () => {
      const wrapper = mount(BaseCard, { props: { shadowSize: "lg" } });

      const card = wrapper.find(".card");

      expect(card.classes()).toContain("shadow-lg");
    });
  });

  describe("When it receives a props 'shadowSize' with value 'none'", () => {
    test("Then it should have class 'shadow-none'", () => {
      const wrapper = mount(BaseCard, { props: { shadowSize: "none" } });

      const card = wrapper.find(".card");

      expect(card.classes()).toContain("shadow-none");
    });
  });

  describe("When the component is rendered with v-slot:header", () => {
    test("Then it should have class 'card__header'", () => {
      const wrapper = mount(BaseCard, {
        slots: { header: h("h1", {}, "Header slot content") },
      });

      expect(wrapper.html()).toContain("card__header");
    });

    test("Then it should render an element inside this slot", () => {
      const wrapper = mount(BaseCard, {
        slots: { header: h("h1", {}, "Header slot content") },
      });
      const HtmlStringWithSlotElement = "<h1>Header slot content</h1>";

      expect(wrapper.html()).toContain(HtmlStringWithSlotElement);
    });
  });

  describe("When the component is rendered with v-slot:body", () => {
    test("Then it should have class 'card__body'", () => {
      const wrapper = mount(BaseCard, {
        slots: { body: h("p", {}, "Body slot content") },
      });

      expect(wrapper.html()).toContain("card__body");
    });

    test("Then it should render an element inside this slot", () => {
      const wrapper = mount(BaseCard, {
        slots: { body: h("p", {}, "Body slot content") },
      });
      const HtmlStringWithSlotElement = "<p>Body slot content</p>";

      expect(wrapper.html()).toContain(HtmlStringWithSlotElement);
    });
  });

  describe("When the component is rendered with v-slot:tags", () => {
    test("Then it should have class 'card__tags'", () => {
      const wrapper = mount(BaseCard, {
        slots: { tags: h("span", {}, "Some tag") },
      });

      expect(wrapper.html()).toContain("card__tags");
    });

    test("Then it should render an element inside this slot", () => {
      const wrapper = mount(BaseCard, {
        slots: { tags: h("span", {}, "Some tag") },
      });
      const HtmlStringWithSlotElement = "<span>Some tag</span>";

      expect(wrapper.html()).toContain(HtmlStringWithSlotElement);
    });
  });

  describe("When an user click on card", () => {
    test("Then it should invoke handleOnClick function", async () => {
      const wrapper = mount(BaseCard, {});
      const card = await wrapper.find(".card");

      await card.trigger("click");

      expect(wrapper.emitted("handleOnClick")).toHaveLength(1);
    });
  });

  describe("When an user press a key on card", () => {
    test("Then it should invoke handleKeyDown function", async () => {
      const wrapper = mount(BaseCard, {});
      const card = await wrapper.find(".card");

      await card.trigger("keydown");

      expect(wrapper.emitted("handleKeyDown")).toHaveLength(1);
    });
  });
});
