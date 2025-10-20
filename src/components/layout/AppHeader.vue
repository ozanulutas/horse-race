<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import BaseButton from '@/components/base/BaseButton.vue'
import { rounds } from '@/constants'

const store = useStore()
const isStarted = ref(false)
const hasSchedules = computed(() => !!store.state.schedule.schedules.length)
const isFinished = computed(() => store.state.race.results.length === rounds.length)

watchEffect(() => {
  if (isFinished) {
    isStarted.value = false
  }
})

const generateProgram = () => {
  store.dispatch('schedule/generateSchedules')

  isStarted.value = false
}

const toggleStart = () => {
  if (isStarted.value) {
    store.dispatch('race/pause')
  } else {
    store.dispatch('race/start')
  }

  isStarted.value = !isStarted.value
}
</script>

<template>
  <header class="app-header">
    <h1 class="app-title">Horse Racing</h1>

    <div class="buttons-container">
      <BaseButton @click="generateProgram" :disabled="isStarted && !isFinished"
        >GENERATE PROGRAM</BaseButton
      >
      <BaseButton @click="toggleStart" :disabled="!hasSchedules || isFinished"
        >START / PAUSE</BaseButton
      >
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 12px;
  background-color: $color-apricot;
  border: 1px solid $color-black;
}

.app-title {
  margin: 0;
}

.buttons-container {
  display: flex;
  gap: 6px;
}
</style>
