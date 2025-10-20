import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import RacePath from '@/components/features/race/RacePath.vue'
import horseImg from '@/assets/images/horse.png'

vi.mock('@/utils', () => ({
  getRandomNumber: () => 50, 
}))

describe('RacePath.vue', () => {
  const horse = {
    name: 'Thunder',
    position: 1,
    progress: 60,
  }

  it('renders horse position correctly', () => {
    const wrapper = mount(RacePath, {
      props: { horse },
    })

    const positionText = wrapper.find('.race-path__position-number')
    expect(positionText.text()).toBe('1')
  })

  it('calculates correct left style when progress > randomness', () => {
    const wrapper = mount(RacePath, {
      props: { horse: { ...horse, progress: 60 } },
    })

    const img = wrapper.find('img')
    expect(img.attributes('style')).toContain('left: calc(60% - 40px)')
  })

  it('calculates correct left style when progress <= randomness', () => {
    const wrapper = mount(RacePath, {
      props: { horse: { ...horse, progress: 40 } },
    })

    const img = wrapper.find('img')
    expect(img.attributes('style')).toContain('left: 40%')
  })

  it('sets image title and src correctly', () => {
    const wrapper = mount(RacePath, {
      props: { horse },
    })

    const img = wrapper.find('img')
    expect(img.attributes('title')).toBe('Thunder')
    expect(img.attributes('src')).toBe(horseImg)
  })
})
