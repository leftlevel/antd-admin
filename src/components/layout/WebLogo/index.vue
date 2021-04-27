<template>
  <div class="web-logo">
    <web-icon v-if="logo" :icon="logo" />
    <span class="anticon"></span>
    <span v-if="!collapse">{{ title }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, Ref } from 'vue'
import { useStore } from 'vuex'
import { title, logo } from '@/utils/setting'
import WebIcon from '@/components/layout/WebIcon/index.vue'

export default defineComponent({
  name: 'WebLogo',
  components: {
    WebIcon
  },

  setup() {
    const store = useStore()
    const collapse: Ref = computed(() => store.state.moduleSetting.collapse)
    
    return {
      title,
      logo,
      collapse
    }
  }
})
</script>

<style lang="less" scoped>
.web-logo {
  display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin: 16px 5px;
    overflow: hidden;
    font-size: 15px;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>