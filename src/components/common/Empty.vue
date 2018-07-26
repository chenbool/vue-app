<template>
  <div class="empty">

    <md-empty-state
      md-icon="devices_other"
      md-label="你还没有登陆"
      md-description="">
      <router-link to="/login">
        <md-button class="md-primary md-raised">登陆</md-button>
      </router-link>
    </md-empty-state>

  </div>
</template>

<script>

export default {
  name: 'empty',
  data () {
    return {
      msg: '苏州智慧龙'
    }
  },
  created() {
    console.log(this.$store.state)
  }
}
</script>

<style scoped>

</style>
