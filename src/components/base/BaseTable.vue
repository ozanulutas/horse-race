<script setup>
const props = defineProps({
  header: {
    type: String,
  },
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <header v-if="props.header" class="table-header">{{ props.header }}</header>
  <table class="base-table">
    <thead>
      <tr>
        <th
          v-for="column in props.columns"
          :key="column.key"
          :style="{ width: column.width }"
          class="base-table__th"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.data" :key="item.id">
        <td v-for="column in props.columns" :key="column.key" class="base-table__td">
          {{ item[column.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.table-header {
  padding: 4px;
  background-color: $color-apricot;
  text-align: center;
  font-weight: bold;
  border-top: 1px solid $color-nobel;
  border-left: 1px solid $color-nobel;
  border-right: 1px solid $color-nobel;
}

.base-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  &__th,
  &__td {
    border: 1px solid $color-nobel;
    padding: 4px;
    text-align: center;
  }

  &__th {
    background-color: $color-alto-1;
    font-weight: bold;
  }

  &__td {
    background-color: $color-white;
  }
}
</style>
