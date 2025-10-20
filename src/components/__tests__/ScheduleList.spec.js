import { describe, it, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import ScheduleList from '@/components/features/ScheduleList.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import TableContainer from '@/components/common/TableContainer.vue'
import { createStore } from 'vuex'

const mockSchedules = [
  {
    lap: 1,
    distance: 1200,
    horses: [
      { id: 1, position: 1, name: 'Thunder' },
      { id: 2, position: 2, name: 'Lightning' },
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
      schedule: {
        namespaced: true,
        state: () => ({
          schedules: mockSchedules,
        }),
      },
    },
  })

describe('ScheduleList.vue', () => {
  it('renders TableContainer with title "PROGRAM"', () => {
    const store = createVuexStore()
    const wrapper = shallowMount(ScheduleList, {
      global: {
        plugins: [store],
        stubs: {
          BaseTable: true,
        },
      },
    })

    const container = wrapper.findComponent(TableContainer)
    expect(container.exists()).toBe(true)
    expect(container.props('title')).toBe('PROGRAM')
  })

  it('renders a BaseTable for each schedule', () => {
    const store = createVuexStore()
    const wrapper = mount(ScheduleList, {
      global: {
        plugins: [store],
      },
    })

    const baseTables = wrapper.findAllComponents(BaseTable)
    expect(baseTables.length).toBe(mockSchedules.length)

    // Check props passed to first BaseTable
    const firstTable = baseTables[0]
    expect(firstTable.props('header')).toBe('1ST Lap - 1200m')
    expect(firstTable.props('data')).toEqual(mockSchedules[0].horses)
    expect(firstTable.props('columns')).toEqual([
      { label: 'Position', key: 'position', width: '70px' },
      { label: 'Name', key: 'name' },
    ])
  })
})
