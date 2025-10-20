import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceTrack from '@/components/features/race/RaceTrack.vue'
import { createStore } from 'vuex'

vi.mock('@/constants', () => ({
  HORSE_COUNT_PER_ROUND: 5,
  rounds: [
    { lap: 1, distance: 1200 },
    { lap: 2, distance: 1500 },
  ],
}))

vi.mock('@/components/features/race/RacePath.vue', () => ({
  default: {
    name: 'RacePath',
    props: ['horse'],
    template: '<div class="race-path-stub">{{ horse.position }}</div>',
  },
}))

const createVuexStore = (state) =>
  createStore({
    state,
    modules: {
      race: {
        namespaced: true,
        state,
      },
    },
  })

describe('RaceTrack.vue', () => {
  it('renders RacePath for each racing horse when available', () => {
    const store = createVuexStore({
      currentLap: 1,
      racingHorses: [
        { id: 1, position: 1, progress: 50, name: 'Bolt' },
        { id: 2, position: 2, progress: 40, name: 'Flash' },
      ],
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [store],
      },
    })

    const racePaths = wrapper.findAllComponents({ name: 'RacePath' })
    expect(racePaths).toHaveLength(2)
    expect(wrapper.text()).toContain('1st Lap 1200m')
  })

  it('renders placeholder RacePaths when no horses are racing', () => {
    const store = createVuexStore({
      currentLap: 1,
      racingHorses: null,
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [store],
      },
    })

    const racePaths = wrapper.findAllComponents({ name: 'RacePath' })
    expect(racePaths).toHaveLength(5) 
  })

  it('displays round info based on currentLap', () => {
    const store = createVuexStore({
      currentLap: 2,
      racingHorses: [],
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.text()).toContain('2st Lap 1500m') 
  })
})
