import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableContainer from '@/components/common/TableContainer.vue'

describe('TableContainer.vue', () => {
  it('renders the title in the header', () => {
    const wrapper = mount(TableContainer, {
      props: {
        title: 'My Table Title',
      },
    })

    const header = wrapper.find('.table-container__header')
    expect(header.exists()).toBe(true)
    expect(header.text()).toBe('My Table Title')
  })

  it('applies custom header class if provided', () => {
    const wrapper = mount(TableContainer, {
      props: {
        title: 'Title',
        headerClass: 'custom-class',
      },
    })

    const header = wrapper.find('header')
    expect(header.classes()).toContain('table-container__header')
    expect(header.classes()).toContain('custom-class')
  })

  it('renders slot content', () => {
    const wrapper = mount(TableContainer, {
      props: {
        title: 'With Slot',
      },
      slots: {
        default: '<div class="test-slot">Hello Slot</div>',
      },
    })

    const slotContent = wrapper.find('.test-slot')
    expect(slotContent.exists()).toBe(true)
    expect(slotContent.text()).toBe('Hello Slot')
  })
})
