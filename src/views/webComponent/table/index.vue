<template>
  <div class="container">
    <a-table :columns="columns"
      :data-source="dataSource"
      :scroll="{ x: 1500, y: 350 }"
      :pagination="false"
    >
      <template #action>
        <a>action</a>
      </template>
    </a-table>

    <a-pagination
      v-model:current="current"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
      :page-size="pageSize"
      @showSizeChange="onShowSizeChange"
    >
    </a-pagination>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { getTable } from '@/api/table'

interface ColumnsItem {
  title: string,
  width?: number,
  dataIndex: string,
  key: string,
  fixed?: string,
  slots?: Object
}
interface DataItem {
  key: number,
  name: string,
  age: number,
  address: string
}

export default defineComponent({
  name: 'Table',
  components: {
    SmileOutlined,
    DownOutlined
  },

  setup() {

    const columns = ref<ColumnsItem[]>()
    const dataSource = ref<DataItem[]>()
    const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50'])
    const current = ref<number>(1)
    const pageSizeRef = ref<number>(10)
    const total = ref<number>(100)

    onMounted(() => {
      getTableData()
    })
    
    const getTableData = async () => {
      const { data } = await getTable()
      columns.value = data.columns
      dataSource.value = data.dataSource
    }
    const onShowSizeChange = (current: number, pageSize: number): void => {
      pageSizeRef.value = pageSize
      getTableData()
    }

    watch(pageSizeRef, () => {
      console.log('pageSize', pageSizeRef.value)
      getTableData()
    })
    watch(current, () => {
      console.log('current', current.value)
      getTableData()
    })

    return {
      columns,
      dataSource,
      current,
      pageSize: pageSizeRef,
      total,
      pageSizeOptions,
      onShowSizeChange
    }
  }
})
</script>

<style lang="less" scoped>
</style>