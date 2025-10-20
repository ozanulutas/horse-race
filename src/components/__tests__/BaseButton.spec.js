import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/base/BaseButton.vue'

describe('BaseButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.text()).toBe('Click Me')
  })

  it('is enabled by default', () => {
    const wrapper = mount(BaseButton)
    const button = wrapper.find('button')
    expect(button.element.disabled).toBe(false)
  })

  it('can be disabled via prop', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    })
    const button = wrapper.find('button')
    expect(button.element.disabled).toBe(true)
  })

  it('emits "click" event when clicked', async () => {
    const wrapper = mount(BaseButton)
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(MouseEvent)
  })

  it('does not emit "click" event when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    })
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
