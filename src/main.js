import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false;
Vue.use(VueAnalytics, {
    id: 'UA-137398101-1',
    router
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
