// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
Vue.use(Vuex);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    blockData: {},
    assetData:{},
    tradeData:{},
    accountBalanceData:{},
    searchInput:"",
    searchType:"",
  },
  mutations: {
    changeBlockData(state, params) {
      state.blockData = params;
      window.sessionStorage.setItem("blockData", JSON.stringify(state.blockData))
    },
    changeAssetData(state, params) {
      state.assetData = params;
      window.sessionStorage.setItem("assetData", JSON.stringify(state.assetData))
    },
    changeTradeData(state, params) {
      state.tradeData = params;
      window.sessionStorage.setItem("tradeData", JSON.stringify(state.tradeData))
    },
    changeAccountBalanceData(state, params) {
      state.accountBalanceData = params;
      window.sessionStorage.setItem("accountBalanceData", JSON.stringify(state.accountBalanceData))
    },
    changeSearchInput(state, params) {
      state.searchInput = params;
    },
    changeSearchType(state, params) {
      state.searchType = params;
    }
  }
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
