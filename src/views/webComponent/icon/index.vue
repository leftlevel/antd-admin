<template>
  <div class="icon-container">
    <a-alert message="点击图标复制代码" type="success" showIcon></a-alert>
    <a-row :gutter="20">
      <a-col :span="24">
        <a-input-search
          v-model:value="queryForm.title"
          placeholder="图标名称"
          enter-button
          @search="queryData"
        />
      </a-col>
      <a-col v-for="(item, index) in queryIcon"
        :key="index"
        :lg="2"
        :md="3"
        :sm="8"
        :xl="2"
        :xs="6"
      >
        <a-card @click="handleCopyIcon(item, $event)">
          <web-icon :icon="item"/>
        </a-card>
        <div class="icon-text" @click="handleCopyText(item, $event)">
          {{ item }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import WebIcon from '@/components/layout/WebIcon/index.vue'
import clip from '@/utils/clipboard'
import { getIcon } from '@/api/icon'

export default defineComponent({
  name: 'Icon',
  components: {
    WebIcon
  },

  setup() {
    const queryIcon = ref<string[]>()
    const queryForm = reactive({
      current: 1,
      pageSize: 72,
      title: ''
    })

    onMounted(() => {
      fetchData()
    })

    const queryData = (): void => {
      queryForm.current = 1
      fetchData()
    }
    const handleCopyText = (item: string, event: Event): void => {
      clip(item, event)
    }
    const handleCopyIcon = (item: string, event: Event): void => {
      clip(`<i class="ri-${item}" aria-hidden="true"></i>`, event)
    }
    const fetchData = async () => {
      const { data } = await getIcon(queryForm)
      queryIcon.value = data
    }
    return {
      queryForm,
      queryIcon,
      queryData,
      handleCopyText,
      handleCopyIcon
    }
  }
})
</script>

<style lang="less">
.icon-container {
  .ant-input-search, .ant-alert {
    margin-bottom: 20px;
  }
  .ant-input-search {
    max-width: 250px;
  }
  .ant-card-body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 68px;
    cursor: pointer;
    
    i {
      font-size: 28px;
      text-align: center;
      pointer-events: none;
      cursor: pointer;
    }
  }
  .icon-text {
    height: 30px;
    overflow: hidden;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>