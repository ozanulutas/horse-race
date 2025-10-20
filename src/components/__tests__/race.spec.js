import { describe, it, expect, vi, afterEach } from 'vitest'
import raceModule from '@/store/modules/race'

vi.useFakeTimers()
// eslint-disable-next-line no-undef
vi.spyOn(global, 'clearInterval')

vi.mock('@/constants', () => ({
  rounds: [
    { lap: 1, distance: 1000 },
    { lap: 2, distance: 1200 },
  ],
}))

describe('race Vuex module', () => {
  describe('mutations', () => {
    it('setCurrentLap sets currentLap in state', () => {
      const state = { currentLap: 1 }
      raceModule.mutations.setCurrentLap(state, 2)
      expect(state.currentLap).toBe(2)
    })

    it('pushResult adds a result to the results array', () => {
      const state = { results: [] }
      const result = { lap: 1, distance: 1000, horses: [] }
      raceModule.mutations.pushResult(state, result)
      expect(state.results).toContain(result)
    })

    it('setRacingHorses sets the racingHorses state', () => {
      const state = { racingHorses: [] }
      const horses = [{ id: 1, progress: 0 }]
      raceModule.mutations.setRacingHorses(state, horses)
      expect(state.racingHorses).toEqual(horses)
    })

    it('setResults sets the results array', () => {
      const state = { results: [] }
      const results = [{ lap: 1, horses: [] }]
      raceModule.mutations.setResults(state, results)
      expect(state.results).toEqual(results)
    })
  })

  describe('actions', () => {
    afterEach(() => {
      vi.clearAllTimers()
    })

    it('pause clears the interval', () => {
      raceModule.actions.pause()
      expect(clearInterval).toHaveBeenCalled()
    })

    it('start progresses horses and triggers next lap', async () => {
      const state = {
        racingHorses: [
          { id: 1, name: 'Alpha', condition: 100, progress: 90 },
          { id: 2, name: 'Bravo', condition: 100, progress: 90 },
        ],
        currentLap: 1,
        results: [],
      }

      const commit = vi.fn()
      const dispatch = vi.fn()
      const rootGetters = {
        'schedule/currentSchedule': vi.fn().mockReturnValue({
          horses: [
            { id: 3, name: 'Charlie', condition: 90, progress: 0 },
            { id: 4, name: 'Delta', condition: 80, progress: 0 },
          ],
        }),
      }

      raceModule.actions.start({ commit, state, dispatch, rootGetters })

      vi.advanceTimersByTime(200)

      expect(commit).toHaveBeenCalledWith('setRacingHorses', expect.any(Array))

      expect(commit).toHaveBeenCalledWith(
        'pushResult',
        expect.objectContaining({
          lap: 1,
          distance: 1000,
          horses: expect.any(Array),
        })
      )

      expect(commit).toHaveBeenCalledWith(
        'setRacingHorses',
        rootGetters['schedule/currentSchedule']().horses
      )

      expect(commit).toHaveBeenCalledWith('setCurrentLap', 2)
      expect(dispatch).toHaveBeenCalledWith('start')
    })
  })
})
