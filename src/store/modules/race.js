import { rounds } from '@/constants'

let intervalId = null

export default {
  namespaced: true,

  state: () => ({
    currentLap: 1,
    results: [],
    racingHorses: [],
  }),

  mutations: {
    setCurrentLap(state, currentLap) {
      state.currentLap = currentLap
    },
    pushResult(state, result) {
      state.results.push(result)
    },
    setRacingHorses(state, horses) {
      state.racingHorses = horses
    },
    setResults(state, results) {
      state.results = results
    },
  },

  actions: {
    start({ commit, state, dispatch, rootGetters }) {
      intervalId = setInterval(() => {
        const horses = state.racingHorses.map((horse) => {
          const step = horse.condition / 10
          const progress = horse.progress >= 100 ? 100 : horse.progress + step

          return {
            ...horse,
            progress,
          }
        })

        commit('setRacingHorses', horses)

        if (horses.every((horse) => horse.progress >= 100)) {
          clearInterval(intervalId)

          const currentLap = state.currentLap
          const nextLap = currentLap + 1 > rounds.length ? rounds.length : currentLap + 1
          const { lap, distance } = rounds.find((rounds) => rounds.lap === currentLap)
          const currentSchedule = rootGetters['schedule/currentSchedule'](nextLap)

          commit('pushResult', {
            lap,
            distance,
            horses: horses.toSorted((a, b) => b.condition - a.condition),
          })

          commit('setRacingHorses', currentSchedule.horses)

          if (currentLap === rounds.length) {
            clearInterval(intervalId)

            return
          }

          commit('setCurrentLap', currentLap + 1)

          dispatch('start')
        }
      }, 200)
    },
    pause() {
      clearInterval(intervalId)
    },
  },

  getters: {},
}
