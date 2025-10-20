<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

import HorseList from '@/components/features/HorseList.vue'
import Track from '@/components/features/race/Track.vue'
import ResultList from '@/components/features/ResultList.vue'
import ScheduleList from '@/components/features/ScheduleList.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

onMounted(() => {
  const store = useStore()

  store.dispatch('horse/generateHorses')
})
</script>

<template>
  <main class="main">
    <AppHeader class="header-area" />
    <HorseList class="horses-area" />
    <Track class="track-area" />
    <div class="schedule-area">
      <ScheduleList class="schedule-area-item" />
      <ResultList class="schedule-area-item" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-areas:
    'header header header'
    'horses track schedule';
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 2fr 1.5fr;
  gap: 12px;
  height: 100vh;
  padding: 8px;

  @media only screen and (max-width: $breakpoint-sm) {
    grid-template-areas:
      'header'
      'track'
      'schedule'
      'horses';
    grid-template-rows: auto;
    grid-template-columns: auto;
    height: auto;
  }
}

.header-area {
  grid-area: header;
}

.track-area {
  grid-area: track;
  padding-right: 28px;
  overflow: auto;
}

.horses-area {
  grid-area: horses;
}

.schedule-area {
  grid-area: schedule;
  display: flex;
  overflow: hidden;

  &-item {
    flex: 1;
  }
}
</style>
