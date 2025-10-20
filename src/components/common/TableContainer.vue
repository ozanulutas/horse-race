<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  headerClass: {
    type: String,
  },
})
</script>

<template>
  <section class="table-container">
    <header :class="['table-container__header', props.headerClass]">{{ props.title }}</header>
    <div class="table-container__tables">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.table-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid $color-black;

  &__header {
    padding: 6px 12px;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid $color-black;
  }

  &__tables {
    flex: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 14px;
      height: 14px;
    }

    &::-webkit-scrollbar-track {
      background: $color-white;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $color-mercury;
      border-radius: 10px;
      border: 1px solid $color-nobel;

      &:hover {
        background-color: $color-alto-1;
      }
    }
  }
}
</style>
