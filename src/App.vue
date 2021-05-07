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
@import '~@/common/web';

body::-webkit-scrollbar {
  width: 4px;
  border-radius: 4px;
  background-color: @color-primary-1;
}
body::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: @color-primary-2;
  &:hover {
    background-color: @color-primary-1;
  }
}
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 4px;
  background: @color-background-base;
}
</style>
