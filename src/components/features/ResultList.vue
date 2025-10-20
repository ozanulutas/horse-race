<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseTable from '@/components/base/BaseTable.vue'
import TableContainer from '@/components/common/TableContainer.vue'

const store = useStore()
const results = computed(() => store.state.race.results)

const columns = [
  { label: 'Position', key: 'position', width: '70px' },
  { label: 'Name', key: 'name' },
]
</script>

<template>
  <TableContainer :headerClass="'table-container-header'" :title="'RESULTS'">
    <BaseTable
      v-for="result in results"
      :data="result.horses"
      :header="`${result.lap}ST Lap - ${result.distance}m`"
      :columns
    />
  </TableContainer>
</template>

<style lang="scss" scoped>
:deep(.table-container-header) {
  background-color: $color-wild-willow;
}
</style>
