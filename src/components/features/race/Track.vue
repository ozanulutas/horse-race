<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { HORSE_COUNT_PER_ROUND, rounds } from '@/constants'
import Path from '@/components/features/race/Path.vue'

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
  <div class="track">
    <div class="track__paths">
      <Path
        v-if="racingHorses.length"
        v-for="horse in racingHorses"
        :key="horse.id"
        :horse="horse"
      />
      <Path v-else v-for="n in HORSE_COUNT_PER_ROUND" :key="n" :horse="{ position: n }" />
    </div>

    <div class="track__info">
      <span>{{ round.lap }}st Lap {{ round.distance }}m</span>
      <span class="track__info-item--right">FINISH</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.track {
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
