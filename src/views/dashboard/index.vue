<template>
  <div>
    这是 dashboard
    <a-button type="primary" @click="test">Primary</a-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getTest } from '@/api/user'

export default defineComponent({
  name: '',
  components: {
  },

  setup() {
    const $router = useRouter()

    const test = () => {
      // $router.push('/webComponent/table')
      getTest().then(res => {
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