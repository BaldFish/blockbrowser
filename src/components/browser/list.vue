<template>
  <div class="list">
    <div class="browser_log">
      <img src="./images/logo.png" alt="车链" @click="turnHome">
    </div>
    <my-search></my-search>
    <div class="container_box">
      <div class="count_box">
        <ul class="count">
          <li>
            <span>当前区块高度：</span>
            <span>{{blockCounts}}</span>
          </li>
          <li>
            <span>最新出块时间：</span>
            <span>{{diffTime}}</span>
          </li>
          <li>
            <span>合作方数量：</span>
            <span>{{partnerCounts}}</span>
          </li>
          <li>
            <span>交易数量：</span>
            <span>{{transactionCounts}}</span>
          </li>
          <li>
            <span>资产数量：</span>
            <span>{{assetCounts}}</span>
          </li>
        </ul>
      </div>
      <div class="info_box">
        <div class="info_title">
          <h2>最新区块</h2>
        </div>
        <div class="info">
          <ul class="info_th">
            <li style="width:164px">区块高度</li>
            <li style="width:716px">区块ID</li>
            <li style="width:152px">交易笔数</li>
            <li style="width:168px">出块时间</li>
          </ul>
          <ul class="info_tb" v-for="(item,index) in blocks" :class="index%2?'even':''" :key="item.number">
            <li style="width:164px">{{item.number}}</li>
            <li style="width:716px;cursor:pointer" @click="clickBlock($event)">{{item.hash}}</li>
            <li style="width:152px">{{item.transactions.length}}</li>
            <li style="width:168px">{{item.timestamp}}</li>
          </ul>
        </div>
      </div>
      <div class="info_box">
        <div class="info_title">
          <h2>最新资产</h2>
        </div>
        <div class="info">
          <ul class="info_th">
            <li style="width:164px">所属人</li>
            <li style="width:716px">资产ID</li>
            <li style="width:152px">资产类型</li>
            <li style="width:168px">创建时间</li>
          </ul>
          <ul class="info_tb saves even" v-for="(item,index) in assets">
            <li style="width:218px" class="apply">
              <a href="javascript:void(0)">
                <img src="./images/logo_launch_small.png" alt="">
              </a>
              <p>深圳市元征科技股份有限公司</p>
            </li>
            <li style="width:662px;cursor:pointer" @click="clickAsset($event)">{{item[3]}}</li>
            <li style="width:152px">{{item[1]}}</li>
            <li style="width:168px">{{item[4]}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mySearch from "./search"
  import formatDate from "@/common/js/formatDate.js";
  import axios from "axios";
  import _ from "lodash";
  import {baseURL, baseContract, baseABI} from '@/common/js/public.js';
  
  const reqURL = `${baseURL}`;
  const tradeURL = `${baseURL}/v1/txn`;
  const contractAddress = `${baseContract}`;
  //实例化web3对象
  var Web3 = require("web3");
  var web3 = new Web3();
  web3.setProvider(new web3.providers.HttpProvider(reqURL));
  //定义abi及调用合约
  var abi = baseABI;
  var MyContract = web3.eth.contract(abi);
  var myContractInstance = MyContract.at(contractAddress);
  export default {
    name: "list",
    components: {
      mySearch,
    },
    data() {
      return {
        blockCounts: "",
        diffTime: "",
        partnerCounts: "",
        transactionCounts: "",
        assetCounts: "",
        blocks: [],
        click_block: "",
        blockData: {},
        assets: [],
        click_asset:"",
        assetData:{},
        transactions: [],
        searchBlock:{},
        searchBlockjp: {},
        searchAsset: {},
        searchAssetjp: {},
        searchTrade: {},
        searchTradejp: {},
        searchAccountBalance: {
          id: "",
          result: ""
        },
        searchAccountBalancejp: {},
      }
    },
    mounted() {
      // 获取区块数量
      this.getBlockCounts();
      //获取合作方数量
      this.getTradeCounts();
      //获取交易数量
      this.getPartnerCounts();
      //获取资产数量
      this.getAssetCounts();
      //获取区块列表
      this.getNewBlocksList();
      //获取资产列表
      this.getNewAssetsList()
      //每隔15秒重新获取数据
      var that = this;
      setInterval(function () {
        //获取最新合作方数量
        that.getTradeCounts();
        //获取最新交易数量
        that.getPartnerCounts();
        // 获取最新区块数量和最新区块列表
        var blockCounts = that.blockCounts;
        that.getBlockCounts();
        var newBlockCounts = that.blockCounts - blockCounts;
        if (newBlockCounts === 0) {
        } else if (10 > newBlockCounts > 0) {
          for (var i = 1; i <= newBlockCounts; i++) {
            var newInfo = web3.eth.getBlock(i + blockCounts);
            newInfo.timestamp = formatDate(
              new Date(newInfo.timestamp * 1000),
              "yyyy-MM-dd hh:mm:ss"
            );
            that.blocks.unshift(newInfo);
            if (that.blocks.length > 10) {
              that.blocks.pop();
            }
          }
        } else {
          for (var i = blockCounts; i > blockCounts - 10; i--) {
            var info = web3.eth.getBlock(i);
            info.timestamp = formatDate(
              new Date(info.timestamp * 1000),
              "yyyy-MM-dd hh:mm:ss"
            );
            that.blocks.push(info);
            if (this.blocks.length > 10) {
              that.blocks.pop();
            }
          }
        }
        // 获取最新资产数量和最新资产列表
        var assetCounts = that.assetCounts;
        that.getAssetCounts();
        var newAssetCounts = that.assetCounts - assetCounts;
        if (newAssetCounts === 0) {
        } else if (10 > newAssetCounts > 0) {
          for (var i = 0; i < newAssetCounts; i++) {
            that.assets.unshift(
              myContractInstance.attestByIndex(parseInt(that.assetCounts) + i)
            );
            if (that.assets.length > 10) {
              that.assets.pop();
            }
            that.assets = that.assets.sort(function (a, b) {
              return b[4] - a[4];
            });
          }
        }else {
          for (var i = 0; i < 10; i++) {
            that.assets.unshift(
              myContractInstance.attestByIndex(parseInt(that.assetCounts) + i)
            );
            if (that.assets.length > 10) {
              that.assets.pop();
            }
            that.assets = that.assets.sort(function (a, b) {
              return b[4] - a[4];
            });
          }
        }
      }, 15000);
    },
    watch: {
      //获取最新出块时间
      blocks: function () {
        if (this.blocks.length > 1) {
          this.getDiffTime();
        }
      }
    },
    methods: {
      //跳转主页
      turnHome() {
        window.location.href = "/"
      },
      //获取最新出块时间
      getDiffTime() {
        var dateNew = new Date(this.blocks[0].timestamp);
        var dateOld = new Date(this.blocks[1].timestamp);
        this.diffTime = (dateNew - dateOld) / 1000 + "s";
      },
      //获取出块数量
      getBlockCounts() {
        this.blockCounts = web3.eth.blockNumber;
      },
      //获取合作方数量
      getPartnerCounts() {
        this.partnerCounts = myContractInstance.partnerNumber().c.toString();
      },
      //获取交易数量
      getTradeCounts() {
        axios
          .get(tradeURL)
          .then(res => {
            this.transactionCounts = res.data.count;
          })
          .catch(error => {
            this.transactionCounts = "";
          });
      },
      //获取资产数量
      getAssetCounts() {
        this.assetCounts = myContractInstance.attestsNunber().c.toString();
      },
      //获取区块列表
      getNewBlocksList() {
        //获取最新10个区块信息
        if (this.blockCounts > 9) {//如果区块数大于等于10取10块区块信息
          for (var i = this.blockCounts; i > this.blockCounts - 10; i--) {
            var info = web3.eth.getBlock(i);
            info.timestamp = formatDate(
              new Date(info.timestamp * 1000),
              "yyyy-MM-dd hh:mm:ss"
            );
            this.blocks.push(info);
          }
        } else {//如果区块数小10则全部取出区块信息
          for (var i = this.blockCounts; i > 0; i--) {
            var info = web3.eth.getBlock(i);
            info.timestamp = formatDate(
              new Date(info.timestamp * 1000),
              "yyyy-MM-dd hh:mm:ss"
            );
            this.blocks.push(info);
          }
        }
      },
      //获取资产列表
      getNewAssetsList() {
        if (this.assetCounts > 9) {//如果存证数大于等于10取10个存证信息
          for (var i = this.assetCounts - 1; i > this.assetCounts - 11; i--) {
            this.assets.push(myContractInstance.attestByIndex(i));
            this.assets = this.assets.sort(function (a, b) {
              return b[4] - a[4];
            });
          }
        } else {//如果存证数小于10全部取出存证信息
          for (var i = this.assetCounts - 1; i > -1; i--) {
            this.assets.push(myContractInstance.attestByIndex(i));
            this.assets = this.assets.sort(function (a, b) {
              return b[4] - a[4];
            });
          }
        }
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
      //点击区块ID显示对应的区块信息页
      clickBlock() {
        this.click_block = event.target.innerText;
        this.searchTime = this.getSearchTime();
        var that = this;
        this.searchBlock = _.find(that.blocks, function (o) {
          return o.hash === that.click_block;
        });
        this.searchBlockjp = this.syntaxHighlight(this.searchBlock);
        this.blockData.searchTime = this.searchTime;
        this.blockData.searchBlock = this.searchBlock;
        this.blockData.searchBlockjp = this.searchBlockjp;
        this.getBlockData();
        window.location.href = "#/browser/blockDetails";
      },
      clickAsset(){
        this.click_asset = event.target.innerText;
        this.searchTime = this.getSearchTime();
        var that = this;
        this.searchAsset = _.find(that.assets, function (o) {
          return o[3] === that.click_asset;
        });
        this.searchAssetjp = this.syntaxHighlight(this.searchAsset);
        this.assetData.searchTime = this.searchTime;
        this.assetData.searchAsset = this.searchAsset;
        this.assetData.searchAssetjp = this.searchAssetjp;
        this.getAssetData();
        window.location.href = "#/browser/assetDetails";
      },
      getBlockData() {
        this.$store.commit("changeBlockData", this.blockData);
      },
      getAssetData() {
        this.$store.commit("changeAssetData", this.assetData);
      },
    },
  }
</script>

<style scoped lang="stylus">
  .list {
    .browser_log {
      text-align: center;
      margin-top 20px
      margin-bottom 60px
      img {
        cursor pointer
      }
    }
    .container_box {
      padding-top: 150px;
      .count_box {
        width: 1200px;
        margin-bottom: 36px;
        margin-left: auto;
        margin-right: auto;
        background-color: rgba(0, 143, 254, 0.73);
        
        .count {
          display: flex;
          
          li {
            display: inline-block;
            flex: 1;
            text-align: center;
            height: 40px;
            line-height: 40px;
            span {
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
            }
          }
        }
      }
      
      .info_box {
        margin-top: 0px;
        margin-bottom: 25px;
        margin-left: auto;
        margin-right: auto;
        
        .info_title {
          margin-left: 12px;
          margin-bottom: 2px;
          width: 120px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #0d50f9;
          border-radius: 15px 15px 0px 0px;
        }
        
        .info {
          width: 1200px;
          margin: 0 auto;
          background-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0px 3px 26px 2px rgba(255, 255, 255, 0.31);
          border-radius: 0px 0px 25px 0px;
          
          ul {
            font-size: 0;
            margin: 0 auto;
            box-sizing: border-box;
            
            li {
              box-sizing: border-box;
              display: inline-block;
              font-size: 14px;
            }
          }
          
          .info_th {
            text-align: center;
            background-color: #a0a0a0;
            height: 30px;
            line-height: 30px;
          }
          
          .info_tb {
            height: 36px;
            line-height: 36px;
            color: #222222;
            
            li {
              border-right: 1px solid #a0a0a0;
              padding-left: 12px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            
            li:last-child {
              border-right: none;
            }
            
            .apply {
              padding-left: 0px;
              text-align: center;
              line-height: normal;
              
              a {
                display: inline-block;
                padding-top: 8px;
              }
            }
          }
          
          .saves {
            height: 82px;
            
            li {
              height: 82px;
              line-height: 82px;
              border-right: 1px solid #a0a0a0;
              border-bottom: 1px solid #a0a0a0;
              p {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          
          .even {
            background-color: #ffffff;
          }
          
          .even:last-child {
            border-radius: 0px 0px 25px 0px;
          }
          
          .info_tb:last-child {
            li {
              border-bottom: none;
            }
          }
          
          .info_tb:hover {
            background-color: #00e0dd;
            color: #ffffff;
            box-shadow: 0px 3px 7px 0px rgba(0, 198, 255, 0.39);
            
            li {
              border: none;
            }
          }
          
          .info_tb:last-child:hover {
            border-radius: 0px 0px 25px 0px;
          }
        }
      }
    }
  }
</style>
