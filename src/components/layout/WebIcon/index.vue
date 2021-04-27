<template>
    <i :class="'ri-' + icon" aria-hidden="true"></i>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import 'remixicon/fonts/remixicon.css'

export default defineComponent({
  name: 'WebIcon',
  components: {},
  props: {
    icon: {
      type: String,
      required: true,
      default: () => ''
    }
  },

  setup() {
    
    return {
      
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