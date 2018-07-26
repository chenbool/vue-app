<template>
  <div class="login">
    <h1>{{ msg }}</h1>

    <md-card>
      <md-card-header>
        <div class="md-title">登陆</div>
      </md-card-header>

      <md-card-content>
        <md-field>
          <md-icon>event</md-icon>
          <label>账号</label>
          <md-input v-model="username"></md-input>
        </md-field>

        <md-field>
          <md-icon>event</md-icon>
          <label>密码</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-button class="md-primary md-raised md-fab-top-center" @click="login">登陆</md-button>
      </md-card-content>

      <md-card-actions>
        <!-- <md-button class="md-primary md-raised md-fab-top-center">登陆</md-button> -->
        <!-- <md-button class="md-accent md-raised">注册</md-button> -->
      </md-card-actions>
    </md-card>


  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      msg: '苏州智慧龙',
      username: null,
      password: null
    }
  },
  components: {
  },
  created() {
    console.log(this.$store.state)
  },
  methods: {
    login: function() {

      const data = {
        "username": this.username,
        "password": this.password
      }
      const _this = this

      // console.log( this.$api.login )

      // 登陆
      this.$axios.post( this.$api.login,data).then(res=>{
        // console.log(res.data)
        if( res.data.error == 0 ){
          _this.$layer.msg( res.data.msg )
          _this.$router.push({ path: '/home' })
          _this.$store.commit('login')
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
