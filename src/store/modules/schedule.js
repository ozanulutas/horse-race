import { HORSE_COUNT_PER_ROUND, rounds } from '@/constants'

export default {
  namespaced: true,

  state: () => ({
    schedules: [],
  }),

  mutations: {
    setSchedules(state, schedules) {
      state.schedules = schedules
    },
  },

  actions: {
    generateSchedules({ commit, rootGetters, dispatch }) {
      const schedules = rounds.map((round) => {
        const horses = rootGetters['horse/randomHorses'](HORSE_COUNT_PER_ROUND)?.map(
          (horse, i) => ({
            id: horse.id,
            name: horse.name,
            position: i + 1,
            condition: horse.condition,
            progress: 0,
          }),
        )

        const { lap, distance } = round

        return {
          lap,
          distance,
          horses,
        }
      })

      commit('setSchedules', schedules)

      dispatch('race/resetRace', schedules[0].horses, { root: true })
    },
  },

  getters: {
    currentSchedule: (state) => (currentLap) => {
      return state.schedules?.find((schedule) => schedule.lap === currentLap)
    },
  },
}
