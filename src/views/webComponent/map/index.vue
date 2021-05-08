<template>
  <div id="container"></div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

export default defineComponent({
  name: 'Map',
  components: {},

  setup() {
    const map = ref()
    const AMapObj = ref<Object>()
    const contextMenuPositon = ref<Object>()

    onMounted(() => {
      initMap()
    })

    onBeforeUnmount(() => {
      destroyMap()
    })

    const initMap = () => {
      AMapLoader.load({
        // 申请好的Web端开发者Key，首次调用 load 时必填
        key: '6c3ceced06f85f6dc3e4a050e3ae71d1',
        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        version: '1.4.15',
        // 需要注册使用的的地图控件列表，如比例尺'AMap.Scale'等
        plugins: [
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.Geolocation'
        ],
        // 是否加载 AMapUI，缺省不加载
        AMapUI: {
          // AMapUI 缺省 1.1
          version: '1.1',
          // 需要加载的 AMapUI ui插件
          plugins: []
        },
        // 是否加载 Loca， 缺省不加载
        Loca: {
          // Loca 版本，缺省 1.3.2
          version: '1.3.2'
        }
      }).then((AMap) => {
        AMapObj.value = AMap
        // 创建 map 实例
        var mapObj = new AMap.Map('container', {
          zoom: 13,
          center: [120.12979, 30.25949],
          resizeEnable: true
        })
        // 添加地图控件
        var toolBar = new AMap.ToolBar()
        mapObj.addControl(toolBar)
        mapObj.addControl(new AMap.Scale())
        // 添加右击菜单项 0
        var contextMenu = new AMap.ContextMenu()
        contextMenu.addItem('添加标记', () => {
          let marker = new AMap.Marker({
            map: mapObj,
            // 基点位置
            position: contextMenuPositon.value,
            // 点击置顶
            topWhenClick: true
          })
          marker.on('dblclick', () => {
            marker.hide()
          })
        }, 0)
        // 添加右击菜单项 1
        contextMenu.addItem('显/隐工具栏', () => {
          if (toolBar.visible === true) toolBar.hide()
          else toolBar.show()
        }, 1)
        
        // 右击事件
        mapObj.on('rightclick', (e: any) => {
          contextMenu.open(mapObj, e.lnglat)
          contextMenuPositon.value = e.lnglat
        })

        map.value = mapObj
      }).catch((e) => {
        console.log(e)
      })
    }

    // 销毁地图回调
    const destroyMap = () => {
      map.value && map.value.destroy()
    }

    return {}
  }
})
</script>

<style lang="less" scoped>
@import '~@/common/web';

#container {
  margin: 0 auto;
  width: calc(100vw - 200px - 4 * @web-padding);
  height: calc(100vh - @web-header-height - 6 * @web-padding);
}
</style>