<template>
  <div>
    <div :style="{ width: '500px' }">
      <a-carousel autoplay effect="fade">
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </a-carousel>
    </div>
    
    <a-button type="primary" @click="test">Primary</a-button>
    <a-month-picker placeholder="Select month" />
    <a-rate v-model="rateValue" allow-half />
    <a-switch loading default-checked />
    <a-slider :default-value="30" />
    <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <a-calendar :fullscreen="false" />
    </div>

    <a-image-preview-group>
      <a-image :width="50" src="https://alicdn.antdv.com/vue.png" />
      <a-image :width="50" src="https://alicdn.antdv.com/logo.png" />
    </a-image-preview-group>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getTest } from '@/api/user'

export default defineComponent({
  name: 'DashBoard',
  components: {
  },

  setup() {
    const $router = useRouter()

    const rateValue = ref<number>()

    const test = () => {
      // $router.push('/webComponent/table')
      getTest().then(res => {
        console.log(res)
      })
    }
    return {
      test,
      rateValue
    }
  }
})
</script>

<style lang="less" scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 100px;
  line-height: 100px;
  background: #364d79;
  overflow: hidden;
}
.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

.ant-slider {
  width: 300px !important;
}
</style>