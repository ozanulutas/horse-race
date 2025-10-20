<script setup>
import { getRandomNumber } from '@/utils'
import horseImg from '@/assets/images/horse.png'

const props = defineProps({
  horse: {
    type: Object,
    default: () => ({}),
  },
})

const randomnessInSpeed = getRandomNumber(20, 80)
</script>

<template>
  <div class="race-path">
    <div class="race-path__position">
      <span class="race-path__position-number">
        {{ props.horse.position }}
      </span>
    </div>

    <div
      :class="[
        'race-path__horse-container',
        props.horse.position === 1 ? 'race-path__horse-container--with-border' : '',
      ]"
    >
      <img
        :src="horseImg"
        :style="{
          left:
            props.horse.progress > randomnessInSpeed
              ? `calc(${props.horse.progress}% - 40px)`
              : `${props.horse.progress}%`,
        }"
        class="race-path__horse"
        alt="Running horse"
        :title="props.horse.name"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.race-path {
  display: flex;
  height: 50px;

  &__position {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 30px;
    background-color: $color-chalet-green;
    color: $color-white;
    border: 1px solid $color-white;

    &-number {
      transform: rotate(-90deg);
    }
  }

  &__horse-container {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    border-bottom: 1px dashed $color-black;

    &--with-border {
      border-top: 1px dashed $color-black;
    }
  }

  &__horse {
    position: absolute;
    height: 70%;
  }
}
</style>
