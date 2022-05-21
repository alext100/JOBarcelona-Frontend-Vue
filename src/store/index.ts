import { ActionContext, createStore } from "vuex";

interface IState {
  groups: Array<unknown>;
}
export default createStore({
  state: {
    groups: [],
  },
  mutations: {
    loadGroups(state, payload) {
      state.groups = payload;
    },
  },
  actions: {
    actionToDispatchOnClick(): void {
      console.log("action");
    },

    getGroups({ commit }: ActionContext<IState, IState>) {
      fetch("/groups.json")
        .then((response) => response.json())
        .then((data) => commit("loadGroups", data.groups));
    },
  },
  modules: {},
});
