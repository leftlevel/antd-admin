<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <template v-if="item.children && item.children.length">
      <web-menu
        v-for="route in item.children"
        :key="route.path"
        :item="route"
      >
      </web-menu>
    </template>
  </component>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import MenuItem from './components/MenuItem.vue'
import Submenu from './components/Submenu.vue'

export default defineComponent({
  name: 'WebMenu',
  components: {
    MenuItem,
    Submenu
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const routeChildren = ref({})
    const menuComponent = ref<string>('')

    const handleChildren = (children = []) => {
      if (children === null) {
        return []
      } else {
        return children.filter((item: any) => item.hidden !== true)
      }
    }

    const showChildren = handleChildren(props.item.children)
    if (showChildren.length === 0) {
      menuComponent.value = 'MenuItem'
      routeChildren.value = props.item
    } else if (showChildren.length === 1 && props.item.alwaysShow !== true) {
      menuComponent.value = 'MenuItem'
      routeChildren.value = showChildren[0]
    } else {
      menuComponent.value = 'Submenu'
    }
    
    return {
      routeChildren,
      menuComponent
    }
  }
})
</script>

<style lang="less">
.anticon {
  margin-right: 3px !important;
}
</style>