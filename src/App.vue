<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 国际化处理（en_GB 为英文）
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default defineComponent({
  setup() {
    return {
      locale: zhCN
    }
  },
})
</script>


<style lang="less">
</style>
