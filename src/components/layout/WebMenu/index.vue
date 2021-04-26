<template>
  <a-sub-menu v-if="title" :key="path">
    <template #title>
      <span>
        <user-outlined />
        <span>{{ title }}</span>
      </span>
    </template>

    <template v-if="item.children">
      <a-menu-item v-for="childrenRoute in item.children" :key="childrenRoute.path">
        <user-outlined />
        <span>{{ childrenRoute.meta.title }}</span>
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>

<script lang='ts'>
import { UserOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref, toRefs } from 'vue'
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
    }
  },

  setup(props) {
    const { path, children } = toRefs(props.item)

    const title = ref<string>('')
    // const childrenRoutes = ref([])

    if (props.item.meta) {
      title.value = props.item.meta.title
    }

    // if (children) {
    //   childrenRoutes.value = children
    // }

    console.log(path.value, children)

    return {
      title,
      path
      // childrenRoutes
    }
  }
})
</script>

<style lang="less">
.anticon {
  margin-right: 3px !important;
}
</style>