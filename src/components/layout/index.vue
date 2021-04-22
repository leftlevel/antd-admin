<template>
  <a-layout class="web-layout-wrap">
    <div class="web-mask" v-if="false"></div>
      <a-layout-sider 
        class="web-sider"
        width="250"
        v-model:collapsed="collapse"
        collapsible
        :trigger="null"
      >
      <web-logo />
      <a-menu 
        class="web-menu"
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
      >
        <!-- <web-menu v-for="route in routes" :key="route.path" :item="route" /> -->
      </a-menu>
    </a-layout-sider>
    <a-layout class="web-layout">
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
          <!-- <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <vab-avatar />
          </a-col> -->
        </a-row>
      </a-layout-header>
    </a-layout>
  </a-layout>
</template>

<script lang='ts'>
import { useRoute } from 'vue-router'
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { routes } from '@/router/index'
import WebLogo from '@/components/layout/WebLogo/index.vue'
import WebMenu from '@/components/layout/WebMenu/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    WebLogo,
    WebMenu,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },

  setup() {
    const route = useRoute()
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    console.log(routes)

    const store = useStore()
    let collapse = computed(() => store.state.moduleSetting.collapse)
    // console.log(collapse.value)
    const toggleCollapse = () => {
      store.commit('toggleCollapse', !collapse.value)
    }

    // 监听路由对象设置当前选中的菜单项 key 值
    watch(route, ({ path, matched }) => {
      // console.log(path, matched)
      matched[0].children.length > 1 ? (selectedKeys.value = [path]) : (selectedKeys.value = [matched[0].path])
      openKeys.value = [matched[0].path]
    }, { immediate: true, deep: true })

    return {
      selectedKeys,
      openKeys,
      routes,
      collapse,
      toggleCollapse
    }
  }
})
</script>

<style lang="less" scoped>
.web-layout-wrap {
  .web-sider {
    position: fixed;
    height: 100vh;
    overflow: auto;
    .web-menu {
      height: cacl(100hv - 65px);
    }
  }
  .web-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #000;
    opacity: 0.5;
  }
  .web-layout {
    padding-left: 250px;
    transition: all 0.2s;

    .web-header {
      padding: 0;
      background: #fff;
      .ant-col + .ant-col {
        display: flex;
        justify-content: flex-end;
        padding: 0 20px;
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
  }
}
</style>