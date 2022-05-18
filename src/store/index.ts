import { createStore } from "vuex";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    actionToDispatchOnClick(): void {
      console.log("action");
    },
  },
  modules: {},
});
