<template>
  <div>
    这是 dashboard
    <a-button type="primary" @click="test">Primary</a-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { getVersion } from '@/api/user'

export default defineComponent({
  name: '',
  components: {
  },

  setup() {
    const test = () => {
      getVersion().then(res => {
        console.log(res)
      })
    }
    return {
      test
    }
  }
})
</script>

<style>
</style>