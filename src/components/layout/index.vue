<template>
  <a-layout class="web-layout-wrap">
    <!-- 左侧 -->
    <a-layout-sider 
      class="web-layout-sider"
      v-model:collapsed="collapse"
      :trigger="null"
      collapsible
    >
      <!-- 菜单 logo -->
      <web-logo />
      <!-- 侧边菜单 -->
      <a-menu
        class="web-menu"
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
      >
        <web-menu v-for="route in routes" :key="route.path" :item="route" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="web-header">
        <a-row>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <menu-unfold-outlined
              v-if="collapse"
              class="trigger"
              @click="toggleCollapse"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="toggleCollapse"
            />
          </a-col>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 用户头像及菜单 -->
            <web-avatar />
          </a-col>
        </a-row>
      </a-layout-header>
      <!-- 标签页 -->
      <web-tabs />
      <!-- 内容 -->
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { defineComponent, ref, watch, computed, onBeforeMount, onBeforeUnmount, onMounted, Ref } from 'vue'
import WebLogo from '@/components/layout/WebLogo/index.vue'
import WebMenu from '@/components/layout/WebMenu/index.vue'
import WebAvatar from '@/components/layout/WebAvatar/index.vue'
import WebTabs from '@/components/layout/WebTabs/index.vue'

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    WebLogo,
    WebMenu,
    WebAvatar,
    WebTabs
  },

  setup() {
    // hooks
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // data
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const width = ref<number>(0)

    // lifehooks
    onBeforeMount(() => {
      window.addEventListener('resize', handleLayouts)
    })
    onMounted(() => {
      handleLayouts
      console.log(routes.value)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleLayouts)
    })

    // computed
    const collapse: Ref = computed(() => store.state.moduleSetting.collapse)
    const device: Ref = computed(() => store.state.moduleSetting.device)
    const routes: Ref = computed(() => store.state.moduleRoutes.routes)
    const classObj: Ref = computed(() => {
      return {
        'web-mobile': device,
        'web-collapse': collapse
      }
    })

    // 伸缩菜单
    const toggleCollapse = (): void => {
      store.commit('toggleCollapse', !collapse.value)
    }
    // 切换布局
    const handleLayouts = (): void => {
      const bcrWidth: number = document.body.getBoundingClientRect().width
      if (width.value !== bcrWidth) {
        const isMobile: boolean = bcrWidth - 1 < 992
        if (isMobile) store.dispatch('toggleDevice', 'mobile')
        else store.dispatch('toggleDevice', 'desktop')
        width.value = bcrWidth
      }
    }

    // 监听路由对象设置当前选中的菜单项 key 值
    watch(route, ({ path, matched }) => {
      // console.log(path, matched)
      matched[0].children.length > 1 ? (selectedKeys.value = [path]) : (selectedKeys.value = [matched[0].path])
      openKeys.value = [matched[0].path]
    }, { immediate: true })

    // console.log(selectedKeys.value, openKeys.value)
    return {
      selectedKeys,
      openKeys,
      routes,
      collapse,
      device,
      toggleCollapse,
      classObj,
    }
  },
})
</script>

<style lang="less">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.web-layout-sider {
  height: 100vh;
  left: 0;
  overflow: auto;
  .web-menu {
    height: calc(100hv - 65px);
  }
}

.web-header {
  padding: 0;
  background: #fff;
  .ant-col + .ant-col {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px
  }
  .trigger {
    height: 65px;
    padding: 0 20px;
    font-size: 18px;
    line-height: 65px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>