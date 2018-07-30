<template>
  <div id="app">

    <md-toolbar class="md-primary md-dense app-title">
      <!-- <div class="md-toolbar-section-start"> -->
        <md-button class="md-icon-button" @click="back" v-show="isback">
          <!-- <md-icon>menu</md-icon> -->
          <i class="fa fa-angle-left fa-2x"></i>
        </md-button>
      <!-- </div> -->
      <h6 class="md-title" v-text="appTitle"> </h6>
    </md-toolbar>

    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      dialog:true,
      appTitle:'苏州智慧龙',
      isback: false
    }
  },
  created() {
    // this.appTitle = this.$store.state.appTitle
  },
  mounted() {
    this.isback = this.$store.state.isback
    // console.log( this.$store.state.isback )
  },
  methods: {
    back: function(){
        this.$router.go(-1);//返回上一层
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 50px 0;
}

.md-content{
  height: 100% !important;
  max-height: 1000px !important;
}

.app-title{
  position: fixed;
  top: 0;
  left: 0;
}

</style>
