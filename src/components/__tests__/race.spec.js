import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
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
  let commit, dispatch, rootGetters, state

  beforeEach(() => {
    commit = vi.fn()
    dispatch = vi.fn()
    rootGetters = {
      'schedule/currentSchedule': vi.fn().mockReturnValue({
        horses: [
          { id: 3, name: 'Charlie', condition: 90, progress: 0 },
          { id: 4, name: 'Delta', condition: 80, progress: 0 },
        ],
      }),
    }

    state = {
      racingHorses: [
        { id: 1, name: 'Alpha', condition: 100, progress: 90 },
        { id: 2, name: 'Bravo', condition: 100, progress: 90 },
      ],
      currentLap: 1,
      results: [],
    }
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.resetAllMocks()
  })

  // -------------------- MUTATIONS --------------------
  describe('mutations', () => {
    it('setCurrentLap sets currentLap in state', () => {
      raceModule.mutations.setCurrentLap(state, 2)
      expect(state.currentLap).toBe(2)
    })

    it('pushResult adds a result to the results array', () => {
      const result = { lap: 1, distance: 1000, horses: [] }
      raceModule.mutations.pushResult(state, result)
      expect(state.results).toContain(result)
    })

    it('setRacingHorses sets the racingHorses state', () => {
      const horses = [{ id: 1, progress: 0 }]
      raceModule.mutations.setRacingHorses(state, horses)
      expect(state.racingHorses).toEqual(horses)
    })

    it('setResults sets the results array', () => {
      const results = [{ lap: 1, horses: [] }]
      raceModule.mutations.setResults(state, results)
      expect(state.results).toEqual(results)
    })
  })

  // -------------------- ACTIONS --------------------
  describe('actions', () => {
    it('pause clears the interval', () => {
      raceModule.actions.pause()
      expect(clearInterval).toHaveBeenCalled()
    })

    it('resetRace resets the race state', () => {
      const payload = [{ id: 5, name: 'Echo', progress: 0 }]
      raceModule.actions.resetRace({ commit }, payload)

      expect(commit).toHaveBeenNthCalledWith(1, 'setRacingHorses', payload)
      expect(commit).toHaveBeenNthCalledWith(2, 'setResults', [])
      expect(commit).toHaveBeenNthCalledWith(3, 'setCurrentLap', 1)
    })

    it('start progresses horses and triggers next lap', async () => {
      raceModule.actions.start({ commit, state, dispatch, rootGetters })

      // advance simulated time enough for the interval to tick twice
      vi.advanceTimersByTime(200)

      // 1️⃣ updates horses' progress
      expect(commit).toHaveBeenCalledWith('setRacingHorses', expect.any(Array))

      // 2️⃣ pushes result for completed lap
      expect(commit).toHaveBeenCalledWith(
        'pushResult',
        expect.objectContaining({
          lap: 1,
          distance: 1000,
          horses: expect.any(Array),
        })
      )

      // 3️⃣ sets new racing horses from schedule
      expect(commit).toHaveBeenCalledWith(
        'setRacingHorses',
        rootGetters['schedule/currentSchedule']().horses
      )

      // 4️⃣ increments lap and starts next round
      expect(commit).toHaveBeenCalledWith('setCurrentLap', 2)
      expect(dispatch).toHaveBeenCalledWith('start')

      // ensure the interval was cleared once finished
      expect(clearInterval).toHaveBeenCalled()
    })

    it('start does not start new lap if last lap is finished', async () => {
      state.currentLap = 2 // last lap
      raceModule.actions.start({ commit, state, dispatch, rootGetters })

      vi.advanceTimersByTime(200)

      expect(commit).toHaveBeenCalledWith(
        'pushResult',
        expect.objectContaining({ lap: 2, distance: 1200 })
      )

      // verify it didn’t continue to a next lap
      expect(commit).not.toHaveBeenCalledWith('setCurrentLap', 3)
      expect(dispatch).not.toHaveBeenCalledWith('start')
      expect(clearInterval).toHaveBeenCalled()
    })
  })
})
