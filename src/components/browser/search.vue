<template>
  <div class="search">
    <div class="search_select_box" @mouseleave="leaveHide">
      <div @click="showType($event)" :class="{ search_select:!togglebg,showdown:togglebg,}">{{searchType}}</div>
      <div style="height: 3px;width: 176px"></div>
      <ul ref="select" :class="{search_type:!togglebg,showv:togglebg,}" @mouseleave="leaveHide">
        <li @click="changType($event)">区块高度</li>
        <li @click="changType($event)">区块哈希</li>
        <li @click="changType($event)">资产哈希</li>
        <li @click="changType($event)">资产ID</li>
        <li @click="changType($event)">交易哈希</li>
        <li @click="changType($event)">账户余额</li>
      </ul>
    </div>
    <input class="search_ipt" type="text" placeholder="请输入您要查找的内容" v-model.trim="search_content">
    <button class="btn" @click.prevent="search"></button>
  </div>
</template>

<script>
  import formatDate from "@/common/js/formatDate.js";
  import axios from "axios";
  import {baseURL} from '@/common/js/public.js';
  import {BigNumber} from 'bignumber.js';
  const searchBlockNumberURL = `${baseURL}/browser/v1/search?block_number=`;
  const searchBlockHashURL = `${baseURL}/browser/v1/search?block_hash=`;
  const searchAssetHashURL = `${baseURL}/browser/v1/search?asset_hash=`;
  const searchAssetIdURL = `${baseURL}/browser/v1/search?asset_id=`;
  const searchTradeHashURL = `${baseURL}/browser/v1/search?transaction_hash=`;
  const searchAccountBalanceURL = `${baseURL}/browser/v1/search?address=`;
  export default {
    name: "home",
    components: {},
    data() {
      return {
        togglebg: false,
        searchType: "区块高度",
        search_content: "",
        searchTime: "",
        searchBlock: {},
        searchBlockjp: {},
        blockData: {},
        searchAsset: {},
        searchAssetjp: {},
        assetData: {},
        searchTrade: {},
        searchTradejp: {},
        tradeData: {},
        searchAccountBalance: {},
        accountBalanceData: {},
      };
    },
    methods: {
      //点击切换显示隐藏下拉列表和更换背景
      showType(event) {
        this.togglebg = !this.togglebg;
      },
      //离开元素隐藏下拉列表
      leaveHide() {
        this.togglebg = false;
      },
      //更改搜索类型，并隐藏下拉列表
      changType(event) {
        this.searchType = event.target.innerText;
        this.togglebg = false;
        this.search_content = ""
      },
      //获取查询时间
      getSearchTime() {
        return formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
      },
      //json数据格式化
      syntaxHighlight(json) {
        if (typeof json != "string") {
          json = JSON.stringify(json, undefined, 2);
        }
        json = json
          .replace(/&/g, "&")
          .replace(/</g, "<")
          .replace(/>/g, ">");
        return json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          function (match) {
            var cls = "number";
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = "key";
              } else {
                cls = "string";
              }
            } else if (/true|false/.test(match)) {
              cls = "boolean";
            } else if (/null/.test(match)) {
              cls = "null";
            }
            return (
              '<span style="word-wrap:break-word;overflow:hidden;" class="' +
              cls +
              '">' +
              match +
              "</span>"
            );
          }
        );
      },
      clearSearch() {
        this.search_content = ""
      },
      search() {
        this.searchTime = this.getSearchTime();
        if (this.search_content === "") {
          return
        } else if (this.searchType === "区块高度") {//按区块高度查询区块信息
          axios({
            method: "GET",
            url: `${searchBlockNumberURL}${this.search_content}`
          }).then((res) => {
            res.data.number=parseInt(res.data.number,16);
            res.data.timestamp=parseInt(res.data.timestamp,16)*1000;
            res.data.timestamp = formatDate(new Date(res.data.timestamp), "yyyy-MM-dd hh:mm:ss");
            this.searchBlock=res.data;
            this.searchBlockjp = this.syntaxHighlight(this.searchBlock);
            this.blockData.searchTime = this.searchTime;
            this.blockData.searchBlock = this.searchBlock;
            this.blockData.searchBlockjp = this.searchBlockjp;
            this.getBlockData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/blockDetails"
          }).catch((err) => {
            this.searchBlock = "";
            this.searchBlockjp = "您输入的区块高度有误!!!"
            this.blockData.searchTime = this.searchTime;
            this.blockData.searchBlock = this.searchBlock;
            this.blockData.searchBlockjp = this.searchBlockjp;
            this.getBlockData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/blockDetails"
          })
        }else if(this.searchType === "区块哈希"){
          axios({
            method: "GET",
            url: `${searchBlockHashURL}${this.search_content}`
          }).then((res) => {
            res.data.number=parseInt(res.data.number,16);
            res.data.timestamp=parseInt(res.data.timestamp,16)*1000;
            res.data.timestamp = formatDate(new Date(res.data.timestamp), "yyyy-MM-dd hh:mm:ss");
            this.searchBlock=res.data;
            this.searchBlockjp = this.syntaxHighlight(this.searchBlock);
            this.blockData.searchTime = this.searchTime;
            this.blockData.searchBlock = this.searchBlock;
            this.blockData.searchBlockjp = this.searchBlockjp;
            this.getBlockData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/blockDetails"
          }).catch((err) => {
            this.searchBlock = "";
            this.searchBlockjp = "您输入的区块高度有误!!!"
            this.blockData.searchTime = this.searchTime;
            this.blockData.searchBlock = this.searchBlock;
            this.blockData.searchBlockjp = this.searchBlockjp;
            this.getBlockData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/blockDetails"
          })
        } else if (this.searchType === "资产哈希") {
          axios({
            method: "GET",
            url: `${searchAssetHashURL}${this.search_content}`,
          }).then((res) => {
            res.data.created_at = formatDate(new Date(res.data.created_at), "yyyy-MM-dd hh:mm:ss");
            res.data.updated_at = formatDate(new Date(res.data.updated_at), "yyyy-MM-dd hh:mm:ss");
            this.searchAsset=res.data;
            this.searchAssetjp = this.syntaxHighlight(this.searchAsset);
            this.assetData.searchTime = this.searchTime;
            this.assetData.searchAsset = this.searchAsset;
            this.assetData.searchAssetjp = this.searchAssetjp;
            this.getAssetData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/assetDetails"
          }).catch((err) => {
            this.searchAsset={};
            this.searchAssetjp = "您输入的资产哈希有误!!!";
            this.assetData.searchTime = this.searchTime;
            this.assetData.searchAsset = this.searchAsset;
            this.assetData.searchAssetjp = this.searchAssetjp;
            this.getAssetData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/assetDetails"
          })
        } else if (this.searchType === "资产ID") {
          axios({
            method: "GET",
            url: `${searchAssetIdURL}${this.search_content}`,
          }).then((res) => {
            res.data.created_at = formatDate(new Date(res.data.created_at), "yyyy-MM-dd hh:mm:ss");
            res.data.updated_at = formatDate(new Date(res.data.updated_at), "yyyy-MM-dd hh:mm:ss");
            this.searchAsset=res.data;
            this.searchAssetjp = this.syntaxHighlight(this.searchAsset);
            this.assetData.searchTime = this.searchTime;
            this.assetData.searchAsset = this.searchAsset;
            this.assetData.searchAssetjp = this.searchAssetjp;
            this.getAssetData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/assetDetails"
          }).catch((err) => {
            this.searchAsset={};
            this.searchAssetjp = "您输入的资产哈希有误!!!";
            this.assetData.searchTime = this.searchTime;
            this.assetData.searchAsset = this.searchAsset;
            this.assetData.searchAssetjp = this.searchAssetjp;
            this.getAssetData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/assetDetails"
          })
        } else if (this.searchType === "交易哈希") {
          axios({
            method: "GET",
            url: `${searchTradeHashURL}${this.search_content}`,
          }).then((res) => {
            this.searchTrade=res.data;
            this.searchTradejp = this.syntaxHighlight(this.searchTrade);
            this.tradeData.searchTime = this.searchTime;
            this.tradeData.searchTrade = this.searchTrade;
            this.tradeData.searchTradejp = this.searchTradejp;
            this.getTradeData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/tradeDetails"
          }).catch((err) => {
            this.searchTrade = "";
            this.searchTradejp = "您输入的交易哈希有误!!!";
            this.tradeData.searchTime = this.searchTime;
            this.tradeData.searchTrade = this.searchTrade;
            this.tradeData.searchTradejp = this.searchTradejp;
            this.getTradeData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/tradeDetails";
          })
        } else if (this.searchType === "账户余额") {
          axios({
            method: "GET",
            url: `${searchAccountBalanceURL}${this.search_content}`,
          }).then((res) => {
            this.searchAccountBalance.id = this.search_content;
            this.searchAccountBalance.result=new BigNumber(Number(res.data.result)).dividedBy(1e+18).toFormat(2);;
            this.accountBalanceData.searchTime = this.searchTime;
            this.accountBalanceData.searchAccountBalance = this.searchAccountBalance;
            this.getAccountBalanceData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/balanceDetails"
          }).catch((err) => {
            this.searchAccountBalance.id = this.search_content;
            this.searchAccountBalance.result  = "您输入的账户地址有误!!!";
            this.accountBalanceData.searchTime = this.searchTime;
            this.accountBalanceData.searchAccountBalance = this.searchAccountBalance;
            this.getAccountBalanceData();
            this.getSearchType();
            this.getSearchInput();
            this.clearSearch();
            window.location.href = "#/browser/balanceDetails"
          })
        }
      },
      getBlockData() {
        this.$store.commit("changeBlockData", this.blockData);
      },
      getAssetData() {
        this.$store.commit("changeAssetData", this.assetData);
      },
      getTradeData() {
        this.$store.commit("changeTradeData", this.tradeData);
      },
      getAccountBalanceData() {
        this.$store.commit("changeAccountBalanceData", this.accountBalanceData);
      },
      getSearchInput() {
        this.$store.commit("changeSearchInput", this.search_content);
      },
      getSearchType() {
        this.$store.commit("changeSearchType", this.searchType);
      },
    },
  };
</script>

<style scoped lang="stylus">
  .search {
    box-sizing: border-box;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 80px;
    font-size: 0;
    position: relative;
    .search_select_box, .search_ipt, .btn {
      outline: none;
      border: none;
      box-sizing: border-box;
      display: inline-block;
      height: 50px;
      line-height: 50px;
      background-color: #ffffff;
      box-shadow: 0px 3px 14px 1px rgba(255, 255, 255, 0.39);
      vertical-align: top;
      color: #222222;
      margin: 0 4px;
    }
    
    .search_select_box {
      border-radius: 25px 0px 0px 0px;
      .search_select {
        margin: 0px;
        width: 126px;
        font-size: 18px;
        line-height: 50px;
        text-align: left;
        padding-left: 50px;
        box-shadow: 0px 3px 14px 1px rgba(255, 255, 255, 0.39);
        border-radius: 25px 0px 0px 0px;
        cursor: pointer;
        background-image: url('./images/up.png');
        background-position: top 17px right 15px;
        background-repeat: no-repeat;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
      }
      .showdown {
        margin: 0;
        width: 126px;
        font-size: 18px;
        line-height: 50px;
        text-align: left;
        padding-left: 50px;
        box-shadow: 0px 3px 14px 1px rgba(255, 255, 255, 0.39);
        border-radius: 25px 0px 0px 0px;
        cursor: pointer;
        background-image: url('./images/down.png');
        background-position: top 17px right 15px;
        background-repeat: no-repeat;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
      }
      .search_type {
        position: absolute;
        top: 73px;
        left: 0;
        box-sizing: border-box;
        width: 176px;
        line-height: 24px;
        background-color: #ffffff;
        border-radius: 0px 0px 25px 0px;
        font-size: 14px;
        text-align: left;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-left: 169px;
        color: #222222;
        visibility: hidden
        li {
          cursor: pointer;
          padding-left: 50px;
        }
        
        li:hover {
          color: #008ffe;
        }
      }
      .showv {
        position: absolute;
        top: 73px;
        left: 0;
        box-sizing: border-box;
        width: 176px;
        line-height: 24px;
        background-color: #ffffff;
        border-radius: 0px 0px 25px 0px;
        font-size: 14px;
        text-align: left;
        padding-top: 10px;
        padding-bottom: 10px;
        
        margin-left: 169px;
        color: #222222;
        visibility: visible
        li {
          cursor: pointer;
          padding-left: 50px;
        }
        
        li:hover {
          color: #008ffe;
        }
      }
    }
    
    .search_ipt {
      width: 604px;
      line-height: 50px;
      padding-left: 15px;
      padding-right: 15px;
      font-size: 14px;
    }
    
    .btn {
      width: 90px;
      border-radius: 0px 0px 25px 0px;
      cursor: pointer;
      background-image: url('./images/search.png');
      background-position: top 12px left 26px;
      background-repeat: no-repeat;
    }
  }

</style>
