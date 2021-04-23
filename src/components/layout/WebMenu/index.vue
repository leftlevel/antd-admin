<template>
  <a-sub-menu v-if="title">
    <template #title>
      <span>
        <user-outlined />
        <span>{{ title }}</span>
      </span>
    </template>

    <a-menu-item v-for="childrenRoute in childrenRoutes" :key="childrenRoute.path">
      <user-outlined />
      <span>{{ childrenRoute.meta.title }}</span>
    </a-menu-item>
  </a-sub-menu>
</template>

<script lang='ts'>
import { UserOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import MenuItem from './components/MenuItem.vue'
import Submenu from './components/Submenu.vue'

export default defineComponent({
  name: 'WebMenu',
  components: {
    MenuItem,
    Submenu,
    UserOutlined
  },

  props: {
    item: {
      type: Object,
      required: true
    },

  },

  setup(props) {
    const { path, children } = props.item

    const title = ref<string>('')
    const childrenRoutes = ref([])

    if (props.item.meta) {
      title.value = props.item.meta.title
    }
    console.log('children', children)

    if (children) {
      childrenRoutes.value = children
    }

    console.log(path)

    return {
      title,
      childrenRoutes
    }
  }
})
</script>

<style lang="less">
.anticon {
  margin-right: 3px !important;
}
</style>