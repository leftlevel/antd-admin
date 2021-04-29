<template>
  <a-spin size="large" tip="Loading..." :spinning="loading">
    <slot name="loadingComponent"></slot>
  </a-spin>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Loading',
  components: {
  },

  setup() {
    const $store = useStore()

    const loading = computed(() => $store.state.moduleSetting.loading)
    return {
      loading
    }
  }
})
</script>

<style>
</style>