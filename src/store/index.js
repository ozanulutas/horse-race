import { createStore } from 'vuex'
import horse from '@/store/modules/horse'
import schedule from '@/store/modules/schedule'
import race from '@/store/modules/race'

export default createStore({
  modules: {
    horse,
    schedule,
    race,
  },
})
