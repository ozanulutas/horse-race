<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { HORSE_COUNT_PER_ROUND, rounds } from '@/constants'
import RacePath from '@/components/features/race/RacePath.vue'

const store = useStore()

const round = computed(() => {
  const currentLap = store.state.race.currentLap

  return rounds.find((round) => round.lap === currentLap)
})

const racingHorses = computed(() => {
  return store.state.race.racingHorses ?? []
})
</script>

<template>
  <div class="race-track">
    <div class="race-track__paths">
      <div v-if="racingHorses.length">
        <RacePath v-for="horse in racingHorses" :key="horse.id" :horse="horse" />
      </div>
      <RacePath v-else v-for="n in HORSE_COUNT_PER_ROUND" :key="n" :horse="{ position: n }" />
    </div>

    <div class="race-track__info">
      <span>{{ round.lap }}st Lap {{ round.distance }}m</span>
      <span class="race-track__info-item--right">FINISH</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.race-track {
  &__paths {
    padding-top: 12px;
    border-right: 2px solid $color-cinnabar;
  }

  &__info {
    position: relative;
    margin-top: 12px;
    text-align: center;
    color: $color-cinnabar;
    font-weight: bold;

    &-item--right {
      position: absolute;
      transform: translate(50%);
      right: 0;
    }
  }
}
</style>
