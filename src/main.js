import './public-path'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import store from './store';

import Main from './components/Main'
import Header from './components/Header'
import Admin from './components/Admin'

const routes = [
  { path: '/', name: 'home', component: Main },
  { path: '/main', name: 'main', component: Main },
  { path: '/header', name: 'header', component: Header },
  { path: '/admin', name: 'admin', component: Admin },
]

Vue.config.productionTip = false
Vue.use(VueRouter)

let router = null
let instance = null
function render(props = {}) {
  const { container } = props
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vueDemo/' : '/',
    mode: 'history',
    routes,
  })

  instance = new Vue({
    router,
    // store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}

// 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
export async function update(props) {
  console.log('update props', props)
}

if (process.env.NODE_ENV === 'development') {
  window.qiankunLifecycle = {
    bootstrap,
    mount,
    unmount,
    update,
  }
}
