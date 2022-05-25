import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseTag from "@/components/atoms/BaseTag.vue";
import BaseTypography from "@/components/atoms/BaseTypography.vue";
import GiftCard from "@/components/molecules/GiftCard.vue";
import { cleanup } from "@testing-library/vue";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { createStore } from "vuex";

const state = {};

const store = createStore({
  state() {
    return state;
  },
  actions: { actionToDispatchOnClick: jest.fn() },
});
store.dispatch = jest.fn();

const wrapperOptions = {
  components: { BaseCard, BaseTag, BT: BaseTypography },
  global: { plugins: [store] },
  props: {
    groupName: "Family",
    groupDescription: "List of presents",
    groupTags: ["Tag-1"],
  },
};

const router = createRouterMock({});
beforeEach(() => {
  injectRouterMock(router);
});
afterEach(() => {
  cleanup();
});
enableAutoUnmount(afterEach);

jest.mock("@/composables/useSplitText", () => ({
  __esModule: true,
  default: () => ({
    ScrollTrigger: jest.fn(),
    SplitText: jest.fn(),
  }),
}));

describe("Given a GiftCard component", () => {
  describe("When it is rendered", () => {
    test("Then it should render card with group name, description, tags received with props", () => {
      const wrapper = mount(GiftCard, wrapperOptions);

      const giftCard = wrapper.find(".gift-card");

      expect(giftCard.exists()).toBe(true);
      expect(giftCard.html()).toContain("Family");
      expect(giftCard.html()).toContain("List of presents");
      expect(giftCard.html()).toContain("Tag-1");
    });
  });

  describe("When an user click on it", () => {
    test("Then it should dispatch action from store", async () => {
      const wrapper = mount(GiftCard, wrapperOptions);

      const giftCard = wrapper.findComponent(BaseCard);
      await giftCard.trigger("click");

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
