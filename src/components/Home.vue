<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/common/Foot'
export default {
  name: 'Home',
  data () {
    return {
      msg: '苏州智慧龙'
    }
  },
  components: {
    foot
  },
  created() {
    // console.log(this.$store.state)
    this.$store.state.activeItem = 'bottom-bar-item-home'
  }
}
</script>

<style scoped>

</style>
