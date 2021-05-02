<template>
  <div class="web-tabs">
    <div class="web-tabs-left-panel">
      <a-tabs
        @tab-click="handleTabClick"
        @edit="handleTabRemove"
        v-model:activeKey="tabActive"
        hide-add
        type="editable-card"
      >
        <a-tab-pane
          v-for="item in visitedRoutes"
          :key="item.fullPath"
          :closable="!isAffix(item)"
          :tab="item.meta.title"
        >
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="web-tabs-right-panel">
      <a-dropdown>
        <template #overlay>
          <a-menu @click="handleClick">
            <a-menu-item key="closeOthersTabs">
              <a>关闭其他</a>
            </a-menu-item>
            <a-menu-item key="closeLeftTabs">
              <a>关闭左侧</a>
            </a-menu-item>
            <a-menu-item key="closeRightTabs">
              <a>关闭右侧</a>
            </a-menu-item>
            <a-menu-item key="closeAllTabs">
              <a>关闭全部</a>
            </a-menu-item>
          </a-menu>
        </template>
        <a-button style="margin-left: 8px">
          更多
          <down-outlined />
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang='ts'>
import { DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, Ref, ref, computed, onBeforeMount, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'WebTabs',
  components: {
    DownOutlined
  },

  setup() {
    // hooks
    const store = useStore()
    const $route = useRoute()
    const $router = useRouter()

    // data
    const affixTabs: Ref = ref([])
    const tabActive: Ref = ref()

    // computed
    const visitedRoutes = computed(() => store.getters.visitedRoutes)
    const routes = computed(() => store.getters.routes)

    // beforMount
    onBeforeMount(() => {
      initAffixTabs(routes.value)
      addTabs($route)
    })

    watch($route, (route) => {
      addTabs(route)
    })

    // method
    const addVisitedRoute = (route: any) => {
      store.dispatch('addVisitedRoute', route)
    }
    const delVisitedRoute = (route: any) => {
      store.dispatch('delVisitedRoute', route)
    }
    const delOthersVisitedRoutes = (route: any) => {
      store.dispatch('delOthersVisitedRoutes', route)
    }
    const delLeftVisitedRoutes = (route: any) => {
      store.dispatch('delLeftVisitedRoutes', route)
    }
    const delRightVisitedRoutes = (route: any) => {
      store.dispatch('delRightVisitedRoutes', route)
    }
    const delAllVisitedRoutes = () => {
      store.dispatch('delAllVisitedRoutes')
    }

    const initAffixTabs = (routes: Array<any>) => {
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          addTabs(route)
        }
        if (route.children) {
          initAffixTabs(route.children)
        }
      })
    }
    const addTabs = async (tag: any) => {
      if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
        let matched = [tag.name]
        if (tag.matched) {
          matched = tag.matched.map((item: any) => item.name)
        }
        await addVisitedRoute({
          path: tag.path,
          fullPath: tag.fullPath,
          query: tag.query,
          params: tag.params,
          name: tag.name,
          matched: matched,
          meta: { ...tag.meta }
        })
        tabActive.value = tag.fullPath
      }
    }
    const isActive = (route: any) => {
      return route.path === $route.path
    }
    const isAffix = (tag: any) => {
      return tag.meta && tag.meta.affix
    }
    const handleTabClick = (tab: string) => {
      const route = visitedRoutes.value.filter((item: any) => {
        return item.path === tab
      })[0]
      if ($route.fullPath !== route.fullPath) {
        $router.push(route)
      }
    }
    const handleTabRemove = async (fullPath: string) => {
      const view = visitedRoutes.value.find((item: any) => {
        return fullPath === item.fullPath
      })
      await delVisitedRoute(view)
      if (isActive(view)) {
        toLastTag()
      }
    }
    const handleClick = ({ key }: any) => {
      switch (key) {
        case 'closeOthersTabs':
          closeOthersTabs()
          break
        case 'closeLeftTabs':
          closeLeftTabs()
          break
        case 'closeRightTabs':
          closeRightTabs()
          break
        case 'closeAllTabs':
          closeAllTabs()
          break
      }
    }
    const closeOthersTabs = async () => {
      await delOthersVisitedRoutes(toThisTag())
    }
    const closeLeftTabs = async () => {
      await delLeftVisitedRoutes(toThisTag())
    }
    const closeRightTabs = async () => {
      await delRightVisitedRoutes(toThisTag())
    }
    const closeAllTabs = async () => {
      await delAllVisitedRoutes()
      if (affixTabs.value.some((tag: any) => tag.path === toThisTag().path)) {
        return
      }
      toLastTag()
    }
    const toLastTag = () => {
      const latestView: string = visitedRoutes.value.slice(-1)[0]
      if (latestView) {
        $router.push(latestView)
      } else {
        $router.push('/')
      }
    }
    const toThisTag = () => {
      const view = visitedRoutes.value.find((item: any) => item.fullPath === $route.fullPath)
      if ($route.path !== view.path) {
        $router.push(view)
      }
      return view
    }

    return {
      tabActive,
      visitedRoutes,
      isAffix,
      handleTabClick,
      handleTabRemove,
      handleClick
    }
  }
})
</script>

<style lang="less">
.web-tabs {
  padding: 0 20px;
  background: #ffffff;
  &-left-panel {
    float: left;
    width: calc(100% - 52px - 20px - 20px);
  }
  &-right-panel {
    float: left;
    width: 52px;
  }
  .ant-tabs {
    &-bar {
      margin: 0 !important;
    }
    &-tab {
      height: 32px !important;
      margin-right: 5px !important;
      line-height: 32px !important;
      background: #ffffff !important;
      border: 1px solid #dedede !important;
    }
    &-tab-prev,
    &-tab-next {
      height: 32px !important;
      line-height: 32px !important;
    }
    &-tab-active {
      border: 1px solid #1890ff !important;
      .ant-tabs-close-x {
        color: #1890ff !important;
      }
    }
  }
}
</style>