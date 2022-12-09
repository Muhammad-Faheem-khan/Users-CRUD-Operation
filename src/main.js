import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { name: 'login', path: '/', component: LoginPage },
  {
    name: 'home', path: '/home', component: HomePage, beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('token')) next({ name: 'login' })
      else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
