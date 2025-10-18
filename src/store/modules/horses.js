export default {
  namespaced: true,

  state: () => ({
    horses: ['Nazlı', 'Hızlı'],
  }),

  mutations: {
    setHorses(state, horses) {
      state.horses = horses
    },
  },

  actions: {
    setHorses({ commit }, payload) {
      commit('setHorses', payload.horses)
    },
  },

  getters: {},
}
