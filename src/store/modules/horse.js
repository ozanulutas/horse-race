import { colors, TOTAL_HORSE_COUNT, horseNames } from '@/constants'
import { getRandomNumber } from '@/utils'

export default {
  namespaced: true,

  state: () => ({
    horses: [],
  }),

  mutations: {
    setHorses(state, horses) {
      state.horses = horses
    },
  },

  actions: {
    generateHorses({ commit }) {
      const indexes = []

      while (indexes.length < TOTAL_HORSE_COUNT) {
        const index = getRandomNumber(0, horseNames.length - 1)

        if (!indexes.includes(index)) {
          indexes.push(index)
        }
      }

      const horses = indexes.map((i) => {
        const horseName = horseNames[i]
        const condition = getRandomNumber(50, 100) // @TODO: düzelt
        const color = colors[i]

        return {
          id: i,
          name: horseName,
          color,
          condition,
        }
      })

      commit('setHorses', horses)
    },
  },

  getters: {
    randomHorses: (state) => (count) => {
      const indexes = []

      while (indexes.length < count) {
        const index = getRandomNumber(0, state.horses.length - 1)

        if (!indexes.includes(index)) {
          indexes.push(index)
        }
      }

      return indexes.map((i) => state.horses[i])
    },
  },
}
