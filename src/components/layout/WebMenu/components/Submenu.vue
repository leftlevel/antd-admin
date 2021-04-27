<template>
  <a-sub-menu :key="item.fullPath">
    <template v-slot:title>
      <span class="anticon">
        <web-icon :icon="icon" />
      </span>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import WebIcon from '@/components/layout/WebIcon/index.vue'

export default defineComponent({
  name: 'Submenu',
  components: {
    WebIcon,
  },
  props: {
    item: {
      type: Object,
      default: () => null
    },
    routeChildren: {
      type: Object,
      default: () => null
    }
  },

  setup(props) {
    let icon: string = props.item.meta.icon
    return {
      icon
    }
  }
})
</script>