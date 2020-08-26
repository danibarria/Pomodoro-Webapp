import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import UserStore from './modules/user.store'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const vuexPersist = new VuexPersist({
  key: 'simplepomodoro',
  storage: window.localStorage,
  modules: ['UserStore']

})

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      UserStore
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [vuexPersist.plugin]
  })

  return Store
}
