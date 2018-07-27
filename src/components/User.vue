<template>
  <div class="user">
    <!-- <img src="../assets/logo.png">     -->

    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title" v-text="info.nickname"></div>
          <div class="md-subhead" v-text="info.email"></div>
        </md-card-header-text>

        <md-card-media>
          <img :src=" 'http://ms.bigzhl.com/'+info.avatar" :alt="info.nickname">
        </md-card-media>
      </md-card-header>
    </md-card>

    <!-- 图表统计 -->
    <div id="container" style="min-width:100px;height:300px"></div>


    <div class="viewport">

      <md-list class="md-double-line">
        <!-- <md-subheader>手机</md-subheader>

        <md-list-item>
          <md-icon class="md-primary">phone</md-icon>

          <div class="md-list-item-text">
            <span>(650) 555-1234</span>
            <span>Mobile</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>sms</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item class="md-inset">
          <div class="md-list-item-text">
            <span>(650) 555-1234</span>
            <span>Mobile</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>sms</md-icon>
          </md-button>
        </md-list-item> -->

        <md-divider></md-divider>

        <div>
          <md-button class="md-raised md-accent" @click="quit">注销登陆</md-button>
        </div>
  
      </md-list>
    </div>

    <foot></foot>
  </div>
</template>

<script>

// 引入HighCharts
import Highcharts from 'HighCharts'
import foot from '@/components/common/Foot'


export default {
  name: 'User',
  data () {
    return {
      info:{},
      options:{}
    }
  },
  components: {
    foot
  },
  created() {
    this.$store.state.activeItem = 'bottom-bar-item-user'
    // console.log(this.$highcharts) 
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    // 获取用户信息
    getInfo: function(){
      const _this = this

      this.$axios.get( this.$api.getinfo,{}).then(res=>{ 
        
        if( res.data.error == 0 ){
          _this.info = res.data.data
          // 初始化图表
          this.initChart()
        }else{
          _this.$layer.msg( res.data.msg )
        }
      })

    },
    // 注销
    quit: function(){
      const _this = this
      
      this.$axios.post( this.$api.quit,{}).then(res=>{ 
        // console.log( res.data )
        if( res.data.error == 0 ){
          _this.$router.push({name: 'login'})
        }else{
          _this.$layer.msg( res.data.msg )
        }
      })
    },
    initChart: function(){
      // 图表配置
      this.options = {
          chart: {
              type: 'column'                          //指定图表的类型，默认是折线图（line）
          },
          title: {
              text: '销售情况'                 // 标题
          },
          credits: {
              enabled: false
          },
          tooltip: {
              animation: true,               // 是否启用动画效果
              formatter: function () {
                  if( this.series.name == '金额' ){
                      return '<b>' + this.x + '</b><br/>' +this.series.name + ': ' + this.y+'万';
                  }else if(this.series.name == '增长'){
                      return '<b>' + this.x + '</b><br/>' +this.series.name + ': ' + this.y+'%';
                  }else{
                      return '<b>' + this.x + '</b><br/>' +this.series.name + ': ' + this.y;
                  }
                  
              }
          },
          xAxis: {
              categories: ['苹果', '香蕉']   // x 轴分类
          },
          yAxis: {
              title: {
                  text: ''                // y 轴标题
              }
          },
          series: [{                              // 数据列
              name: '小明',                        // 数据列名
              data: [1, 0, 4]                     // 数据
          }]
      };

      const _this = this

      // 获取销售 填充图表数据
      this.$axios.get( this.$api.getsale,{time:'week',nickname: _this.info.nickname }).then(res=>{ 

        _this.options.xAxis.categories = res.data[1];
        _this.options.series = [
          {
              name: '金额',
              data: res.data[0]
          },
          {
              type: 'line',
              name: '增长',
              data: res.data[2]
          },
        ];

        // 图表初始化
        const chart = Highcharts.chart('container', this.options);

      })

    }

  }
}
</script>

<style scoped>
</style>
