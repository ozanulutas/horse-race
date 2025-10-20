import { describe, it, expect, vi } from 'vitest'
import horseModule from '@/store/modules/horse'
import { getUniqueRandomNumbers, getRandomNumber } from '@/utils'

vi.mock('@/utils', () => ({
  getUniqueRandomNumbers: vi.fn(),
  getRandomNumber: vi.fn(),
}))

vi.mock('@/constants', () => ({
  TOTAL_HORSE_COUNT: 3,
  horseNames: ['Alpha', 'Bravo', 'Charlie', 'Delta'],
  colors: ['red', 'blue', 'green', 'yellow'],
}))

describe('horse Vuex module', () => {
  describe('mutations', () => {
    it('setHorses sets horses in state', () => {
      const state = { horses: [] }
      const mockHorses = [{ id: 1, name: 'Alpha' }]
      horseModule.mutations.setHorses(state, mockHorses)
      expect(state.horses).toEqual(mockHorses)
    })
  })

  describe('actions', () => {
    it('generateHorses commits horses with name, color, and condition', () => {
      const commit = vi.fn()
      getUniqueRandomNumbers.mockReturnValue([0, 1, 2])
      getRandomNumber.mockReturnValue(42)

      horseModule.actions.generateHorses({ commit })

      expect(commit).toHaveBeenCalledWith('setHorses', [
        { id: 0, name: 'Alpha', color: 'red', condition: 42 },
        { id: 1, name: 'Bravo', color: 'blue', condition: 42 },
        { id: 2, name: 'Charlie', color: 'green', condition: 42 },
      ])
    })
  })

  describe('getters', () => {
    it('randomHorses returns subset based on random indexes', () => {
      const state = {
        horses: [
          { id: 1, name: 'Alpha' },
          { id: 2, name: 'Bravo' },
          { id: 3, name: 'Charlie' },
        ],
      }

      getUniqueRandomNumbers.mockReturnValue([2, 0])

      const result = horseModule.getters.randomHorses(state)(2)
      expect(result).toEqual([
        { id: 3, name: 'Charlie' },
        { id: 1, name: 'Alpha' },
      ])
    })
  })
})
