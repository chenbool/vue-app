<template>
  <div class="home">
    <!-- <h1>{{ msg }}</h1> -->

    <md-card>
      <!-- <md-card-header>
        <div class="md-title">今日销售</div>
      </md-card-header> -->

      <md-card-content>
        <div id="container" style="min-width:100px;height:250px"></div>
      </md-card-content>
    </md-card>


    <foot></foot>
  </div>
</template>

<script>
// 引入HighCharts
import Highcharts from 'HighCharts'
import foot from '@/components/common/Foot'

export default {
  name: 'Home',
  data () {
    return {
      msg: '苏州智慧龙',
      options: {}
    }
  },
  components: {
    foot
  },
  created() {
    // console.log(this.$store.state)
    this.$store.state.activeItem = 'bottom-bar-item-home'
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart: function(){
      // 图表配置
      this.options = {
          chart: {
              type: 'pie'                          //指定图表的类型，默认是折线图（line）
          },
          title: {
              text: '销售情况'                 // 标题
          },
          series: [{
                type: 'pie',
                name: '销售',
                data: [{
                    name: '小张',
                    y: 13
                }, {
                    name: '小潘',
                    y: 23
                }]
          }]
      };

      const _this = this

      // 获取数据 填充图表数据
      // this.$axios.get( this.$api.getsale,{}).then(res=>{ 
      // })

      // 图表初始化
      const chart = Highcharts.chart('container', this.options);
    }
  }


}
</script>

<style scoped>

</style>
