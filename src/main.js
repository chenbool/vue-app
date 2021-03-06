// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// VueMaterial
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

// 分页
import vPage from 'v-page';
Vue.use(vPage)

import 'font-awesome/css/font-awesome.css'
import axios from "axios"
import store from './store/store'
import api from './api'

Vue.prototype.$store = store
Vue.prototype.$axios = axios
Vue.prototype.$api = api
console.log(api)

// layer
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
