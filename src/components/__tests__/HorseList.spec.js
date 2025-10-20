import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseList from '@/components/features/HorseList.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import TableContainer from '@/components/common/TableContainer.vue'
import { createStore } from 'vuex'

const mockHorses = [
  { id: 1, name: 'Bolt', condition: 23, color: 'Black' },
  { id: 2, name: 'Spirit', condition: 80, color: 'Brown' },
]

const createVuexStore = () =>
  createStore({
    modules: {
      horse: {
        namespaced: true,
        state: () => ({
          horses: mockHorses,
        }),
      },
    },
  })

describe('HorseList.vue', () => {
  it('renders TableContainer with dynamic title based on horse count', () => {
    const store = createVuexStore()
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    })

    const container = wrapper.findComponent(TableContainer)
    expect(container.exists()).toBe(true)
    expect(container.props('title')).toBe(`Horse List (1 - ${mockHorses.length})`)
  })

  it('renders BaseTable with correct data and columns', () => {
    const store = createVuexStore()
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    })

    const baseTable = wrapper.findComponent(BaseTable)
    expect(baseTable.exists()).toBe(true)
    expect(baseTable.props('data')).toEqual(mockHorses)
    expect(baseTable.props('columns')).toEqual([
      { label: 'Name', key: 'name' },
      { label: 'Condition', key: 'condition', width: '80px' },
      { label: 'Color', key: 'color' },
    ])
  })
})
