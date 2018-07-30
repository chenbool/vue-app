<template>
  <div class="customer">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

export default {
  name: 'customer',
  data () {
    return {
      msg: '我的客户',
      username: null,
      password: null
    }
  },
  components: {
  },
  created() {
    // this.$store.state.activeItem = true
  },
  mounted() {
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
          // localStorage.setItem('nickname', res.data.user_name )
        }else{
          _this.$layer.msg( res.data.msg )
        }
        
      })

    }
  }
}
</script>

<style >

</style>
