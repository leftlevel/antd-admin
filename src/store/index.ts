import { createStore } from 'vuex'
import moduleSetting from './modules/moduleSetting'
import moduleRoutes from './modules/moduleRoutes'

export default createStore({
  modules: {
    moduleSetting,
    moduleRoutes
  }
})
