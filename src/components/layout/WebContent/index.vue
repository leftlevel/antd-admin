<template>
  <loading>
    <template #loadingComponent>
      <a-layout-content class="web-content">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade-transform">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </template>
  </loading>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Loading from '@/components/layout/Loding/index.vue'

export default defineComponent({
  name: 'WebContent',
  components: {
    Loading
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

<style lang="less">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.web-content {
  min-height: calc(100vh - 65px - 4 * 20px) !important;
  padding: 20px;
  margin: 20px;
  background: #fff;
  .error-container {
    height: calc(100vh - 65px - 5 * 20px - 20px) !important;
  }
}
</style>