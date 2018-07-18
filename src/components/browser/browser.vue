<template>
  <div class="browser">
    <router-view class="content"></router-view>
  </div>
</template>

<script>
  export default {
    name: "browser",
    components: {},
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style lang="stylus">
  .browser {
    padding-top 90px
    background-color: #040b1c;
    background-image: url('./images/bg-top.png'), url('./images/bg-bottom.png');
    background-position: top center, top 1080px center;
    background-repeat: no-repeat, repeat-y;
    padding-bottom: 55px;
    .content {
      width: 1224px;
      margin: 0 auto;
    }
  }
</style>
<style lang="stylus">
  .pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    line-height: 1.5;
    span {
      color #666666;
    }
    
    .string {
      color: #666666;
    }
    
    .number {
      color: #666666;
    }
    
    .boolean {
      color: #666666;
    }
    
    .null {
      color: #666666;
    }
    
    .key {
      color: #666666;
    }
  }
</style>
