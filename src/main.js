// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import AFTableColumn from 'af-table-column'
//引入 elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//当前项目使用ele
Vue.use(ElementUI);
Vue.use(AFTableColumn)



/*
import { Toast } from 'vant';
import 'vant/lib/index.css';
Vue.use(Toast);
*/
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
