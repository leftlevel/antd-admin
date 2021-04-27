<template>
  <a-menu-item :key="routeChildren.path" @click.capture="handleLink">
    <span class="anticon">
      <web-icon :icon="icon" />
    </span>
    <span>{{ routeChildren.meta.title }}</span>
  </a-menu-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isExternal } from '@/utils/validate'
import WebIcon from '@/components/layout/WebIcon/index.vue'

export default defineComponent({
  name: 'MenuItem',
  components: {
    WebIcon
  },
  props: {
    item: {
      type: Object,
      default: () => null
    },
    routeChildren: {
      type: Object,
      default: () => null
    },
  },

  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const icon: string = props.routeChildren.meta.icon

    const handleLink = (): void => {
      const routePath = props.routeChildren.fullPath
      const target = props.routeChildren.meta.target
      if (target === '_blank') {
        if (isExternal(routePath)) window.open(routePath)
        else if (route.path !== routePath) window.open(routePath.href)
      } else {
        if (isExternal(routePath)) window.location.href = routePath
        else if (route.path !== routePath) router.push(routePath)
      }
    }

    return {
      handleLink,
      icon
    }
  }
})
</script>