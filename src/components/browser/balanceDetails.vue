<template>
  <div class="balanceDetails">
    <my-search></my-search>
    <div class="account_info block_info">
      <div class="block_info_th">
        <h3>账户余额</h3>
        <div class="block_info_md">
          <ul class="middle_left">
            <li>用户ID：</li>
            <li>余额：</li>
          </ul>
          <ul class="middle_right">
            <li>{{accountBalanceData.searchAccountBalance.id}}</li>
            <li>{{accountBalanceData.searchAccountBalance.result}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import formatDate from "@/common/js/formatDate.js";
  import mySearch from "./search";
  import {baseURL, baseContract, baseABI} from '@/common/js/public.js';
  const reqURL = `${baseURL}`;
  var Web3 = require("web3");
  var web3 = new Web3();
  web3.setProvider(new web3.providers.HttpProvider(reqURL));
  
  export default {
    name: "balanceDetails",
    components: {
      mySearch
    },
    data() {
      return {
        accountBalanceData:{}
      }
    },
    beforeMount() {
      this.fetchAccountBalanceData()
    },
    watch: {
      searchInput:function () {
        this.fetchAccountBalanceData()
      }
    },
    computed: {
      searchInput:function () {
        if(this.$store.state.searchType==="账户余额"){
          return this.$store.state.searchInput
        }
      }
    },
    methods: {
      //取出区块信息
      fetchAccountBalanceData() {
        this.accountBalanceData = JSON.parse(sessionStorage.getItem("accountBalanceData"))
      },
    },
  }
</script>

<style scoped lang="stylus">
.balanceDetails{
  .block_info {
    width 1200px
    margin 0 auto
    font-size 0
    .block_info_th {
      margin-bottom 20px
      box-sizing border-box
      width 1200px
      height 184px
      background-color: #ffffff;
      border-radius: 10px;
      border: solid 1px #eeeeee;
      h3 {
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        color: #ffffff;
        background-color: rgba(0, 143, 254, 0.77);
        border-radius: 10px 10px 0px 0px;
        background-image: url("./images/xinxi.png");
        background-position: left 10px center;
        background-repeat: no-repeat;
        padding-left 36px
      }
      p {
        font-size 14px
        color: #999999;
        padding-left 10px
        padding-top 8px
      }
      .block_info_md {
        font-size 0px
        color #666666
        padding 15px 10px
        
        .left, .middle_left, .middle_right, .right {
          display inline-block
          font-size 14px
        }
        .middle_left, .middle_right {
          line-height 24px
          height 24px
        }
        .middle_right {
          color #222222
          vertical-align top
          li {
            width 850px
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height 24px
          }
        }
        .left, .right {
          margin 0 10px
          width 17px
          height 23px
          background-position: top center;
          background-repeat: no-repeat;
          position relative
          top 30px
          cursor pointer
        }
        .left {
          margin-right 20px
          background-image: url("./images/left.png");
        }
        .right {
          background-image: url("./images/right.png");
        }
      }
    }
    .block_info_tb {
      font-size 14px;
      color: #999999;
      width: 1200px;
      min-height 184px
      box-sizing border-box
      border: solid 1px #eeeeee;
      border-radius: 10px;
      background-color: #ffffff;
      .asset_info{
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        color: #ffffff;
        background-color: rgba(0, 143, 254, 0.77);
        border-radius: 10px 10px 0px 0px;
        background-image: url("./images/xinxi.png");
        background-position: left 10px center;
        background-repeat: no-repeat;
        padding-left 36px
      }
      
      p{
        padding 20px 25px;
      }
    }
  }
  .account_info {
    .block_info_th {
      h3 {
        background-image: url("./images/¥.png");
      }
    }
  }
}
</style>
