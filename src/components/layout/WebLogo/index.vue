<template>
  <div class="web-logo">
    <img :src="logo" alt="">
    <span>{{ title }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { title } from '@/utils/setting'
export default defineComponent({
  name: 'WebLogo',
  components: {
  },

  setup() {
    
    return {
      title,
      logo: require('../../../assets/logo.png')
    }
  }
})
</script>

<style lang="less" scoped>
.web-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin: 16px 5px;
  overflow: hidden;
  font-size: 15px;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  img {
    width: 23px;
    height: 23px;
  }
}
</style>