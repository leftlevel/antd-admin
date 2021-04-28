import { createStore } from 'vuex'
import moduleSetting from './modules/moduleSetting'
import moduleRoutes from './modules/moduleRoutes'
import moduleUser from './modules/moduleUser'
import moduleTagsBar from './modules/moduleTagsBar'

export default createStore({
  modules: {
    moduleSetting,
    moduleRoutes,
    moduleUser,
    moduleTagsBar
  }
})
