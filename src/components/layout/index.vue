<template>
  <a-layout class="web-layout-wrap">
    <a-layout-sider 
      class="web-layout-sider"
      v-model:collapsed="collapse"
      :trigger="null"
      collapsible
    >
      <web-logo />
      <a-menu
        class="web-menu"
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        @click="handleRoute"
      >
        <web-menu v-for="route in routes" :key="route.path" :item="route" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
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
            <!-- <vab-avatar /> -->
            123
          </a-col>
        </a-row>
      </a-layout-header>
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
import { defineComponent, ref, watch, computed,onBeforeMount, onBeforeUnmount, onMounted, reactive } from 'vue'
import WebLogo from '@/components/layout/WebLogo/index.vue'
import WebMenu from '@/components/layout/WebMenu/index.vue'

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    WebLogo,
    WebMenu
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const width = ref<number>(0)
    const routes = ref<Object[]>([])
    
    routes.value = router.options.routes
    // console.log('routes', routes)

    onBeforeMount(() => {
      window.addEventListener('resize', handleLayouts)
    })

    onMounted(() => {
      handleLayouts
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleLayouts)
    })


    const collapse = computed(() => store.state.moduleSetting.collapse)
    const device = computed(() => store.state.moduleSetting.device)
    const classObj = computed(() => {
      return {
        'web-mobile': device,
        'web-collapse': collapse
      }
    })

    const toggleCollapse = () => {
      store.commit('toggleCollapse', !collapse.value)
    }

    // 切换布局
    const handleLayouts = () => {
      const bcrWidth = document.body.getBoundingClientRect().width
      if (width.value !== bcrWidth) {
        const isMobile = bcrWidth - 1 < 992
        if (isMobile) store.dispatch('toggleDevice', 'mobile')
        else store.dispatch('toggleDevice', 'desktop')
        width.value = bcrWidth
      }
    }

    // 切换路由回调
    const handleRoute = () => {
        console.log(111)
    }

    // 监听路由对象设置当前选中的菜单项 key 值
    watch(route, ({ path, matched }) => {
      // console.log(path, matched)
      matched[0].children.length > 1 ? (selectedKeys.value = [path]) : (selectedKeys.value = [matched[0].path])
      openKeys.value = [matched[0].path]
    }, { immediate: true, deep: true })

    // console.log(selectedKeys.value, openKeys.value)
    return {
      selectedKeys,
      openKeys,
      routes,
      collapse,
      device,
      toggleCollapse,
      classObj,
      handleRoute
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