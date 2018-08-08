import Vue from 'vue'
import App from 'Docs/App'
import 'normalize.css'
import './style.sass'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
