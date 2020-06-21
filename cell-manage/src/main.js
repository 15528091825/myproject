import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/css/reset.css'
import '@/assets/fonts/iconfont.css'

// 使用element
Vue.use(ElementUI);



// 引入Echarts
import Echarts from 'echarts'
Vue.prototype.echarts = Echarts
//使用引入Echarts
Vue.use(Echarts)

// 使用$bus中介
Vue.prototype.$bus=new Vue();



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
