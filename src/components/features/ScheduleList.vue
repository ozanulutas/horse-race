<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseTable from '@/components/base/BaseTable.vue'
import TableContainer from '@/components/common/TableContainer.vue'

const store = useStore()
const schedules = computed(() => store.state.schedule.schedules)

const columns = [
  { label: 'Position', key: 'position', width: '70px' },
  { label: 'Name', key: 'name' },
]
</script>

<template>
  <TableContainer :headerClass="'table-container-header'" :title="'PROGRAM'">
    <BaseTable
      v-for="schedule in schedules"
      :key="schedule.lap"
      :data="schedule.horses"
      :header="`${schedule.lap}ST Lap - ${schedule.distance}m`"
      :columns
    />
  </TableContainer>
</template>

<style lang="scss" scoped>
:deep(.table-container-header) {
  background-color: $color-cornflower-blue;
}
</style>
