import Vue from 'vue'
import Table from './views/Table.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-table-drag'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(Table)
}).$mount('#app')
