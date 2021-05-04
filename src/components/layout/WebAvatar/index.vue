<template>
  <div class="web-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ 'admin' }}
        <down-outlined />
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="handleSetting">
            <SettingOutlined />
            <span style="margin-left: 4px">设置</span>
          </a-menu-item>
          <a-menu-item @click="logout">
            <LogoutOutlined />
            <span style="margin-left: 4px">退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { recordRoute } from '@/utils/setting'

export default defineComponent({
  name: 'WebAvatar',
  components: {
    DownOutlined,
    LogoutOutlined,
    SettingOutlined
  },

  setup() {

    // hooks
    const store = useStore()
    const $route = useRoute()
    const $router = useRouter()

    // method
    const logout = async () => {
      await store.dispatch('logout')
      if (recordRoute) {
        const fullPath = $route.fullPath
        $router.push(`/login?redirect=${fullPath}`)
      } else {
        $router.push('/login')
      }
    }
    const handleSetting = () => {
      console.log('设置主题')
    }

    const avatar = computed(() => store.state.moduleUser.avatar)
    
    return {
      logout,
      handleSetting,
      avatar
    }
  }
})
</script>

<style lang="less">
.web-avatar {
  margin-left: 10px;
  .ant-dropdown-link {
    display: block;
    min-height: 64px;
    cursor: pointer;
  }
}
</style>