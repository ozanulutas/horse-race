import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultList from '@/components/features/ResultList.vue'
import TableContainer from '@/components/common/TableContainer.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import { createStore } from 'vuex'

const mockResults = [
  {
    lap: 1,
    distance: 1200,
    horses: [
      { id: 1, position: 1, name: 'Rocket' },
      { id: 2, position: 2, name: 'Blazer' },
    ],
  },
  {
    lap: 2,
    distance: 1400,
    horses: [
      { id: 3, position: 1, name: 'Storm' },
    ],
  },
]

const createVuexStore = () =>
  createStore({
    modules: {
      race: {
        namespaced: true,
        state: () => ({
          results: mockResults,
        }),
      },
    },
  })

describe('ResultList.vue', () => {
  it('renders TableContainer with title "RESULTS"', () => {
    const store = createVuexStore()
    const wrapper = mount(ResultList, {
      global: {
        plugins: [store],
      },
    })

    const container = wrapper.findComponent(TableContainer)
    expect(container.exists()).toBe(true)
    expect(container.props('title')).toBe('RESULTS')
  })

  it('renders a BaseTable for each result entry', () => {
    const store = createVuexStore()
    const wrapper = mount(ResultList, {
      global: {
        plugins: [store],
      },
    })

    const baseTables = wrapper.findAllComponents(BaseTable)
    expect(baseTables.length).toBe(mockResults.length)

    const first = baseTables[0]
    expect(first.props('header')).toBe('1ST Lap - 1200m')
    expect(first.props('data')).toEqual(mockResults[0].horses)
    expect(first.props('columns')).toEqual([
      { label: 'Position', key: 'position', width: '70px' },
      { label: 'Name', key: 'name' },
    ])
  })
})
