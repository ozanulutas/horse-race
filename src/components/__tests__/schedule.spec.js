import { describe, it, expect, vi } from 'vitest'
import scheduleModule from '@/store/modules/schedule'

vi.mock('@/constants', () => ({
  HORSE_COUNT_PER_ROUND: 2,
  rounds: [
    { lap: 1, distance: 1000 },
    { lap: 2, distance: 1200 },
  ],
}))

describe('schedule Vuex module', () => {
  describe('mutations', () => {
    it('setSchedules correctly updates the state', () => {
      const state = { schedules: [] }
      const mockSchedules = [{ lap: 1, distance: 1000, horses: [] }]
      scheduleModule.mutations.setSchedules(state, mockSchedules)
      expect(state.schedules).toEqual(mockSchedules)
    })
  })

  describe('actions', () => {
    it('generateSchedules generates schedules and commits them', () => {
      const commit = vi.fn()
      const rootGetters = {
        'horse/randomHorses': vi.fn().mockReturnValue([
          { id: 1, name: 'Alpha', condition: 50 },
          { id: 2, name: 'Bravo', condition: 70 },
        ]),
      }

      scheduleModule.actions.generateSchedules({ commit, rootGetters })

      expect(commit).toHaveBeenCalledWith(
        'setSchedules',
        expect.arrayContaining([
          expect.objectContaining({
            lap: 1,
            distance: 1000,
            horses: [
              { id: 1, name: 'Alpha', position: 1, condition: 50, progress: 0 },
              { id: 2, name: 'Bravo', position: 2, condition: 70, progress: 0 },
            ],
          }),
        ])
      )

      expect(commit).toHaveBeenCalledWith(
        'race/setRacingHorses',
        expect.any(Array),
        { root: true }
      )

      expect(commit).toHaveBeenCalledWith('race/setResults', [], { root: true })
      expect(commit).toHaveBeenCalledWith('race/setCurrentLap', 1, { root: true })
    })
  })

  describe('getters', () => {
    it('currentSchedule returns the schedule for a given lap', () => {
      const state = {
        schedules: [
          { lap: 1, distance: 1000 },
          { lap: 2, distance: 1200 },
        ],
      }

      const result = scheduleModule.getters.currentSchedule(state)(2)
      expect(result).toEqual({ lap: 2, distance: 1200 })
    })
  })
})
