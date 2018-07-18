import Vue from 'vue'
import Router from 'vue-router'
import myBrowser from '@/components/browser/browser'
import myList from '@/components/browser/list'
import myBlockDetails from '@/components/browser/blockDetails'
import myAssetDetails from '@/components/browser/assetDetails'
import myTradeDetails from '@/components/browser/tradeDetails'
import myBalanceDetails from '@/components/browser/balanceDetails'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/browser"
    },
    {
      path: "/browser",
      //name: "browser",
      component: myBrowser,
      children:[
        {
          path: '',
          redirect:"list",
        },
        {
          path: '/browser/list',
          name: 'list',
          component: myList
        },
        {
          path: '/browser/blockDetails',
          name: 'blockDetails',
          component: myBlockDetails
        },
        {
          path: '/browser/assetDetails',
          name: 'assetDetails',
          component: myAssetDetails
        },
        {
          path: '/browser/tradeDetails',
          name: 'tradeDetails',
          component: myTradeDetails
        },
        {
          path: '/browser/balanceDetails',
          name: 'balanceDetails',
          component: myBalanceDetails
        },
      ]
    },
  ]
})
