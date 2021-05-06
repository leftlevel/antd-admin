<template>
  <div>
    这是 dashboard
    <a-button type="primary" @click="test">Primary</a-button>
    <hr />
    <a-month-picker placeholder="Select month" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getTest } from '@/api/user'

export default defineComponent({
  name: 'DashBoard',
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