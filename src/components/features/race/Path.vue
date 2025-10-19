<script setup>
import horseImg from '@/assets/images/horse.png'

const props = defineProps({
  horse: {
    type: Object,
    default: {},
  },
})
</script>

<template>
  <div class="path">
    <div class="path__position">
      <span class="path__position-number">
        {{ horse.position }}
      </span>
    </div>

    <div class="path__horse-container">
      <img
        :src="horseImg"
        :style="{
          left: horse.progress > 85 ? `calc(${horse.progress}% - 40px)` : `${horse.progress}%`,
        }"
        class="path__horse"
        alt="Running horse"
        :title="horse.name"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.path {
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
  }

  &__horse {
    position: absolute;
    height: 70%;
  }
}
</style>
