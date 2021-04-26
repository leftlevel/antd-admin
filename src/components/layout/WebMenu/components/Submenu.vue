<template>
  <a-sub-menu :key="item.fullPath">
    <template v-slot:title>
      <!-- <span class="anticon">
        <i :class="'ri-' + icon" aria-hidden="true"></i>
      </span> -->
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import 'remixicon/fonts/remixicon.css'

export default defineComponent({
  name: '',
  components: {
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

<style lang="less" scoped>
[class*='ri'] {
  font-size: 16px;
  vertical-align: -1px;
}
</style>