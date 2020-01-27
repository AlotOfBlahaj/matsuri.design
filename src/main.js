import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics'
import VuePlyr from 'vue-plyr'

Vue.config.productionTip = false;
Vue.use(VueAnalytics, {
    id: 'UA-137398101-1',
    router
});
Vue.use(VuePlyr, {
    plyr: {
        fullscreen: {enabled: false}
    },
    emit: ['ended']
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
