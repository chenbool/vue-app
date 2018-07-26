<template>
  <div class="good">
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar v-show="isSearch">

        <md-field >
          <label for="movie">分类</label>
          <md-select name="currentCate" v-model="currentCate">
            <md-option value="0" v-text=" '全部' "></md-option>
            <md-option :value="item.id" v-for="(item, index) in cates" :key="index" v-text="item.name"></md-option>
          </md-select>
        </md-field>

        <md-field >
          <label for="movie">颜色</label>
          <md-select name="color" v-model="currentCate">
            <md-option value="0" v-text=" '全部' "></md-option>
          </md-select>
        </md-field>

        <!-- <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="名称..." v-model="search" @input="searchOnTable" />
        </md-field> -->

        <md-autocomplete v-model="search" :md-options="histoty">
          <label>名称</label>
        </md-autocomplete>

        <div>
          <md-button class="md-raised md-primary md-dense" @click="searchByName">搜索</md-button> 
        </div>

      </md-table-toolbar>

      <md-table-empty-state
        md-label="没有找到"
        :md-description="`没有找到 '${search}' 相关信息.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <!-- <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
        <md-table-cell md-label="名称" md-sort-by="name">{{ item.name }}</md-table-cell>
        <!-- <md-table-cell md-label="型号" md-sort-by="model">{{ item.model }}</md-table-cell> -->
        <md-table-cell md-label="规格" md-sort-by="length">{{ item.length }}</md-table-cell>
        <md-table-cell md-label="数量" md-sort-by="num" md-numeric>{{ item.num }}</md-table-cell>
        <md-table-cell md-label="单价" md-sort-by="price" md-numeric>{{ item.price }}</md-table-cell>
      </md-table-row>
    </md-table>

    <foot></foot>

  </div>
</template>

<script>
  // const toLower = text => {
  //   return text.toString().toLowerCase()
  // }

  // const searchByName = (items, term) => {
  //   if (term) {
  //     return items.filter(item => toLower(item.name).includes(toLower(term)))
  //   }
  //   return items
  // }

  import foot from '@/components/common/Foot'

  export default {
    name: 'Good',
    data: () => ({
      search: '',
      searched: [],
      cates: [],
      isSearch: true,
      currentCate: 0,
      histoty: [],
    }),
    created () {
      this._initData()
      this.getCate()
      this.getCache()
      this.$store.state.activeItem = 'bottom-bar-item-page'
    },
    methods: {
      searchByName: function() {
        const data = {
          cate: this.currentCate,
          name: this.search
        }

        // console.log( this.search )
        // localStorage.setItem('history', '[]' )

        if(  this.search != null && this.search.length>0 ){
          this.setCache( this.search )
        }

        const _this = this
        this.$axios.get( this.$api.good,{params:data}).then(res=>{ 
          _this.searched = res.data.data
        })

      },
      _initData: function(){
        const _this = this
        this.$axios.get( this.$api.good,{}).then(res=>{ 
          _this.searched = res.data.data
        })
      },
      getCate: function(){
        this.$axios.get( this.$api.cate,{}).then(res=>{ 
          this.cates = res.data
        })
      },
      setCache: function(val){
        if(window.localStorage){
          const res = localStorage.getItem('history')

          if( res == 'undefined' || res == null){
            const temp = new Array()
            temp.push(val)
            localStorage.setItem('history', JSON.stringify(temp) )
          }else{
            const temp = JSON.parse(res)
            // console.log(temp)
            // 数组去重
            Array.prototype.distinct = function (){
              var arr = this,i,j,len = arr.length;
              for(i = 0; i < len; i++){
                for(j = i + 1; j < len; j++){
                  if(arr[i] == arr[j]){
                    arr.splice(j,1);
                    len--;
                    j--;
                  }
                }
              }
              return arr;
            };

            // 只能保存10条 大于10条要清除
            if(temp.length <=10){
              temp.push(val)
              const tempArr = temp.distinct()
              this.histoty = tempArr
              localStorage.setItem('history', JSON.stringify(tempArr) )
            }else{
              // 删除第一条
              tempArr.shift()
              const tempArr = temp.distinct()
              this.histoty = tempArr
              localStorage.setItem('history', JSON.stringify(tempArr) )
            }
        
          }

        }else{
          alert('This browser does NOT support localStorage');
        }
      },
      getCache: function() {
        if(window.localStorage){
          const res = localStorage.getItem('history')
          if( res != 'undefined' || res != null){
            const temp = JSON.parse(res)
            this.histoty = temp
            // console.log(temp)
          }
        }else{
          alert('This browser does NOT support localStorage');
        }
      }
      
    },
    components: {
      foot
    }
  }
</script>

<style lang="css">
  .md-field {
    max-width: 100%;
  }
  .md-table-cell .md-table-cell-container{
    font-size: 10px;
  }

  /* .md-table-fixed-header-container thead tr th:first-child div:first-child{
    width:185px; 
  } */
</style>