<template>
  <div class="error-container">
    <div class="error-content">
      <a-row :gutter="20">
        <a-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
          <div class="pic-error">
            <img class="pic-error-parent" src="@/assets/error_images/404.png" />
            <img class="pic-error-child left" src="@/assets/error_images/cloud.png" />
          </div>
        </a-col>

        <a-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
          <div class="bullshit">
            <div class="bullshit-oops">{{ oops }}</div>
            <div class="bullshit-headline">{{ headline }}</div>
            <div class="bullshit-info">{{ info }}</div>
            <a class="bullshit-return-home" href="#/dashboard">
              {{ jumpTime }}s&nbsp;{{ btn }}
            </a>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: '404',

  setup() {
    // data
    const errorInfo = reactive({
      jumpTime: 5,
      oops: '抱歉',
      headline: '当前页面不存在...',
      info: '请检查您输入的网址是否正确，或点击下面的按钮返回首页',
      btn: '返回首页',
      timer: 0
    })
    const { timer, jumpTime } = toRefs(errorInfo)

    // hooks
    const $router = useRouter()
    const $store = useStore()
    
    onMounted(() => {
      timeChange()
    })
    onBeforeUnmount(() => {
      clearInterval(timer.value)
    })

    // method
    const timeChange = (): void => {
      errorInfo.timer = setInterval(() => {
        if (jumpTime.value) {
          jumpTime.value--
        } else {
          $router.push('/dashboard')
          $store.dispatch('delOthersVisitedRoutes', { path: '/' })
          clearInterval(timer.value)
        }
      }, 1000)
    }
    
    return {
      ...toRefs(errorInfo)
    }
  }
})
</script>

<style lang="less" scoped>
.error-container {
  position: relative;
  height: 100vh;
  
  .error-content {
    position: relative;
    top: 55%;
    left: 50%;
    width: 40vw;
    height: 400px;
    transform: translate(-50%, -50%);

    .pic-error {
      position: relative;
      float: left;
      width: 100%;
      overflow: hidden;
    
      &-parent {
        width: 100%;
      }

      &-child {
        position: absolute;

         &.left {
           top: 17px;
           left: 220px;
           width: 80px;
           opacity: 0;
           animation-name: cloudLeft;
           animation-duration: 2s;
           animation-timing-function: linear;
           animation-delay: 1s;
           animation-fill-mode: forwards;
         }

         @keyframes cloudLeft {
           0% {
             top: 17px;
             left: 220px;
             opacity: 0;
           }

           20% {
             top: 33px;
             left: 188px;
             opacity: 1;
           }

           80% {
             top: 81px;
             left: 92px;
             opacity: 1;
           }

           100% {
             top: 97px;
             left: 60px;
             opacity: 0;
           }
         }
      }
    }

    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;

      &-oops {
        margin-bottom: 20px;
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        opacity: 0;
        animation-name: slideUp;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
      }

      &-headline {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        line-height: 24px;
        color: #222;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }

      &-info {
        margin-bottom: 30px;
        font-size: 13px;
        line-height: 21px;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }

      &-return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: #1890ff;
        border-radius: 100px;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5 s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }

      @keyframes slideUp {
        0% {
          opacity: 0;
          transform: translateY(60px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}
</style>