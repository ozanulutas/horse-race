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
    <header :class="['table-container__header', headerClass]">{{ title }}</header>
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

    // &::-webkit-scrollbar {
    //   width: 16px;
    //   height: 16px;
    // }

    // &::-webkit-scrollbar-track {
    //   background: $color-alto-1;
    // }

    // &::-webkit-scrollbar-thumb {
    //   background-color: $color-nobel;
    //   border-radius: 10px;
    //   border: 1px solid $color-nobel;
    // }

    // &::-webkit-scrollbar-thumb:hover {
    //   background-color: #555;
    // }
  }
}
</style>
