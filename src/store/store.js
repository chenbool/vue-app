import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    islogin:false,
    activeItem: 'bottom-bar-item-home',
    isback: false
  },
  mutations: {
    login: (state) => {
      state.islogin = true
    },
    back: (state) => {
      state.isback = !true
    },
    changeActiveItem: (state,newVal) => {
      state.activeItem = newVal
    }
  }
})

export default store
