<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import BaseTable from '@/components/base/BaseTable.vue'
import TableContainer from '@/components/common/TableContainer.vue'

const store = useStore()
const horses = computed(() => store.state.horse.horses)

const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Condition', key: 'condition', width: '80px' },
  { label: 'Color', key: 'color' },
]
</script>

<template>
  <TableContainer
    :headerClass="'table-container-header'"
    :title="`Horse List (1 - ${horses.length})`"
  >
    <BaseTable :data="horses" :columns />
  </TableContainer>
</template>

<style lang="scss" scoped>
:deep(.table-container-header) {
  background-color: $color-manz;
  text-align: left;
}
</style>
