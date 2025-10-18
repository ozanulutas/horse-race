import { createStore } from 'vuex'
import horses from '@/store/modules/horses'

export default createStore({
  modules: {
    horses,
  },
})
