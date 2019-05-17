import Vue from 'vue';
import Router from 'vue-router';
import Share from "./components/share/share";
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/share/:id?',
      name: 'share',
      component: Share,
    },
  ],
});
