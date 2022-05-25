import BaseTypography from "@/components/atoms/BaseTypography.vue";
import HorizontalScroll from "@/components/atoms/HorizontalScroll.vue";
import GiftCard from "@/components/molecules/GiftCard.vue";
import CardList from "@/components/organisms/CardList.vue";
import { cleanup } from "@testing-library/vue";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { createStore } from "vuex";

const mockedState = {
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
  ],
};

const store = createStore({
  state() {
    return mockedState;
  },
  actions: { getGroups: jest.fn() },
});
store.dispatch = jest.fn();

const router = createRouterMock({});
beforeEach(() => {
  injectRouterMock(router);
});
afterEach(() => {
  cleanup();
});
enableAutoUnmount(afterEach);

describe("Given a CardList component", () => {
  describe("When it is rendered", () => {
    test("Then it should render the header", () => {
      const wrapper = mount(CardList, {
        global: { plugins: [store] },
        components: { GiftCard, HorizontalScroll, BT: BaseTypography },
      });

      const header = wrapper.find('[data-test="card-list-header"]');

      expect(header.exists()).toBe(true);
    });

    test("Then it should render HorizontalScroll component", () => {
      const wrapper = mount(CardList, {
        global: { plugins: [store] },
        components: { GiftCard, HorizontalScroll, BT: BaseTypography },
      });

      const horizontalScroll = wrapper.findComponent(HorizontalScroll);

      expect(horizontalScroll.exists()).toBe(true);
    });

    test("Then it should render all the cards from state", () => {
      const wrapper = mount(CardList, {
        global: { plugins: [store] },
        components: { GiftCard, HorizontalScroll, BT: BaseTypography },
      });

      const giftCards = wrapper.findAll(".gift-card");

      expect(giftCards.length).toBe(mockedState.groups.length);
      expect(wrapper.html()).toContain("Lista de regalos para el grupo Family");
      expect(wrapper.html()).toContain("Lista de regalos para el grupo Crew");
    });
  });
});
