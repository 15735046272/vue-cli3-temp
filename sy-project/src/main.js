import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import moment from 'moment';
import YDUI from 'vue-ydui';
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.base.css';
/* 全局引入vuex */
import store from './store';
/* 全局引入vue-meta,管理头部标签 */
import Meta from 'vue-meta';

/* 全局引入index.less */
import './common/less/index.less';



// 在这里显式调用插件
Vue.use(YDUI);
Vue.use(Meta);
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;


new Vue({
  router,
  store,
  el: '#app',
  components: {
    App,
  },
  template: '<App/>',
});
