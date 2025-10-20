<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button class="base-button" :disabled="props.disabled" @click="emit('click', $event)">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  padding: 6px 20px;
  font-weight: bold;

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
