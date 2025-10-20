import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '@/components/base/BaseTable.vue'

const mockColumns = [
  { key: 'name', label: 'Name', width: '150px' },
  { key: 'condition', label: 'Condition', width: '100px' },
]

const mockData = [
  { id: 1, name: 'Alice', condition: 30 },
  { id: 2, name: 'Bob', condition: 25 },
]

describe('BaseTable.vue', () => {
  it('renders header when `header` prop is provided', () => {
    const wrapper = mount(BaseTable, {
      props: {
        header: 'Horse List',
        columns: mockColumns,
        data: mockData,
      },
    })

    const header = wrapper.find('.table-header')
    expect(header.exists()).toBe(true)
    expect(header.text()).toBe('Horse List')
  })

  it('does not render header if `header` prop is not provided', () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    })

    const header = wrapper.find('.table-header')
    expect(header.exists()).toBe(false)
  })

  it('renders correct number of columns', () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    })

    const ths = wrapper.findAll('th')
    expect(ths.length).toBe(mockColumns.length)
  })

  it('renders correct number of rows', () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(mockData.length)
  })

  it('renders correct cell data', () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    })

    const firstRowTds = wrapper.findAll('tbody tr')[0].findAll('td')
    expect(firstRowTds[0].text()).toBe('Alice')
    expect(firstRowTds[1].text()).toBe('30')
  })
})
