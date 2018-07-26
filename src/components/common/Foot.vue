<template>
  <div class="foot">

<!--
    <md-speed-dial md-event="click" md-direction="top" md-effect="scale">
      <md-speed-dial-target class="md-primary">
        <md-icon>my_location</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button">
          <md-icon>directions</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>streetview</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
-->

    <md-bottom-bar md-type="shift" :md-active-item="activeItem">
      <md-bottom-bar-item 
        v-for="(item,key) in barItem" :id="item.id" :key="key"
        :to="item.url" :md-label="item.label" :md-icon="item.icon" 
        @click="changeBar(item.id)" 
      >
      </md-bottom-bar-item>
    </md-bottom-bar>


  </div>
</template>

<script>
export default {
  name: 'Foot',
  data () {
    return {
      activeItem: '',
      barItem:[
        {
          id: 'bottom-bar-item-home',
          label: '首页',
          icon: 'home',
          url: '/'
        },
        {
          id: 'bottom-bar-item-page',
          label: '查询',
          icon: 'pages',
          url: '/good'
        },
        {
          id: 'bottom-bar-item-post',
          label: '测试',
          icon: 'verified_user',
          url: ''
        },
        {
          id: 'bottom-bar-item-user',
          label: '用户',
          icon: 'people',
          url: '/user'
        },
      ]
    }
  },
  created() {
    // console.log(this.$store.state)
  },
  mounted() {
    this.activeItem = this.$store.state.activeItem
  },
  methods: {
    changeBar:function(id) {
      this.activeItem = id
      this.$store.state.activeItem = id
    }
  }
}
</script>

<style>
  .foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index:9999;
  }
</style>
