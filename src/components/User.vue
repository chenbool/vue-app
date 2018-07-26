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
  <!-- 
      <md-card-actions>
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions> 
  -->

    </md-card>


    <div class="viewport">

      <md-list class="md-double-line">
        <md-subheader>手机</md-subheader>

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
        </md-list-item>

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
import foot from '@/components/common/Foot'
export default {
  name: 'User',
  data () {
    return {
      info:{}
    }
  },
  components: {
    foot
  },
  created() {
    this.getInfo()
    this.$store.state.activeItem = 'bottom-bar-item-user'
  },
  methods: {
    // 获取用户信息
    getInfo: function(){
      const _this = this

      this.$axios.get( this.$api.getinfo,{}).then(res=>{ 
        // console.log( res.data )
        if( res.data.error == 0 ){
          _this.info = res.data.data
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
    }
  }
}
</script>

<style scoped>
</style>
