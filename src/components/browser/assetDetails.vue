<template>
  <div class="assetDetails">
    <my-search></my-search>
    <div class="block_info save_info">
      <div class="block_info_th">
        <h3>资产信息</h3>
        <div class="block_info_md">
          <ul class="middle_left">
            <li>所属人：</li>
            <li>资产ID：</li>
            <li>资产类型：</li>
            <li>资产内容：</li>
            <li>资产哈希：</li>
            <li>创建时间：</li>
          </ul>
          <ul class="middle_right">
            <li>{{assetData.searchAsset[0]}}</li>
            <li>{{assetData.searchAsset[3]}}</li>
            <li>{{assetData.searchAsset[1]}}</li>
            <li>{{assetData.searchAsset[2]}}</li>
            <li>{{assetData.searchAsset[3]}}</li>
            <li>{{assetData.searchAsset[4]}}</li>
          </ul>
        </div>
      </div>
      <div class="block_info_th_right">
        <h3>所属人</h3>
        <div class="th_right_md">
          <img src="./images/logo_launch_save.png" alt="">
          <p>深圳市元征科技股份有限公司</p>
        </div>
      </div>
      <div class="block_info_tb">
        <h3 class="asset_info">资产记录</h3>
        <p class="pre" v-html="assetData.searchAssetjp"></p>
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
    name: "assetDetails",
    components: {
      mySearch
    },
    data() {
      return {
        assetData: {}
      }
    },
    beforeMount() {
      this.fetchAssetData()
    },
    watch: {
      searchInput:function () {
        this.fetchAssetData()
      }
    },
    computed: {
      searchInput:function () {
        if(this.$store.state.searchType==="资产哈希"||this.$store.state.searchType==="资产ID"){
          return this.$store.state.searchInput
        }
      }
    },
    methods: {
      //取出区块信息
      fetchAssetData() {
        this.assetData = JSON.parse(sessionStorage.getItem("assetData"))
      },
    },
  }
</script>

<style scoped lang="stylus">
  .assetDetails {
    .block_info {
      width 1200px
      margin 0 auto
      font-size 0
      .block_info_th {
        margin-bottom 46px
        box-sizing border-box
        width 1200px
        height 216px
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
        min-height 225px
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
    .save_info {
      .block_info_th {
        display inline-block
        width 960px
        .block_info_md {
          padding 14px 10px 13px
        }
        h3 {
          background-image: url("./images/cun.png");
        }
      }
      .block_info_th_right {
        float right
        display inline-block
        margin-bottom 46px
        box-sizing border-box
        width 230px
        height 216px
        background-color: #ffffff;
        border-radius: 10px;
        border: solid 1px #eeeeee;
        text-align center
        h3 {
          font-size: 16px;
          height: 36px;
          line-height: 36px;
          color: #ffffff;
          background-color: rgba(0, 143, 254, 0.77);
          border-radius: 10px 10px 0px 0px;
        }
        .th_right_md {
          font-size 14px
          color: #666666;
          padding 10px
          img {
            margin 11px
          }
          p {
            line-height 34px
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      
    }
  }
</style>
