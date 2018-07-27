<template>
  <div class="good">
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>

      <md-table-toolbar v-show="isSearch" class="search-box">

        <md-field >
          <label for="movie">分类</label>
          <md-select name="currentCate" v-model="currentCate">
            <md-option value="0" v-text=" '全部' "></md-option>
            <md-option :value="item.id" v-for="(item, index) in cates" :key="index" v-text="item.name"></md-option>
          </md-select>
        </md-field>

        <md-field >
          <label for="movie">颜色</label>
          <md-select name="color" v-model="currentColor">
            <md-option v-for="(item, index) in colors" :key="index" :value="item.value" v-text="item.name"></md-option>
          </md-select>
        </md-field>

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
        <md-table-cell md-label="颜色" md-sort-by="color">{{ item.color }}</md-table-cell>
        <md-table-cell md-label="数量" md-sort-by="num" md-numeric>{{ item.num }}</md-table-cell>
        <md-table-cell md-label="单价" md-sort-by="price" md-numeric>{{ item.price }}</md-table-cell>
      </md-table-row>
    </md-table>

    <!-- page -->
    <v-page :setting="pageSet" @page-change="pageChange"></v-page>

    <!-- 搜索 -->
    <div class="search-state md-primary" @click="isSearch = !isSearch">
      <i :class="'fa '+searchIcon+' fa-lg'" aria-hidden="true"></i>
      <md-icon>search</md-icon>
    </div>

    <foot></foot>

  </div>
</template>

<script>
  import foot from '@/components/common/Foot'

  export default {
    name: 'Good',
    data: () => ({
      search: '',
      searched: [],
      cates: [],
      isSearch: false,
      searchIcon: 'fa-angle-double-left',
      currentCate: 0,
      histoty: [],
      currentColor: '',
      colors: [
        {name: '全部',value: ' '},
        {name: '黑色',value: '黑'},
        {name: '白色',value: '白'},
        {name: '灰色',value: '灰'},
        {name: '红色',value: '红'},
        {name: '橙色',value: '橙'},
        {name: '黄色',value: '黄'},
        {name: '绿色',value: '绿'},
        {name: '青色',value: '青'},
        {name: '蓝色',value: '蓝'},
        {name: '紫色',value: '紫'},
        {name: '棕色',value: '棕'},
        {name: '双色',value: '双'},
        {name: '无',value: '未知'}
      ],
      pageSet: {
        totalRow: 0,//required option
        language: 'cn',//default: 'cn en'
        pageSizeMenu: [10, 15, 20, 30, 50, 100]//default: [10, 20, 50, 100]
      }

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
          name: this.search,
          color: this.currentColor
        }

        // localStorage.setItem('history', '[]' )
        // 保存搜索记录到本地
        if(  this.search != null && this.search.length>0 ){
          this.setCache( this.search )
        }

        const _this = this
        this.$axios.get( this.$api.good,{params:data}).then(res=>{ 
          _this.pageSet.totalRow = res.data.total
          _this.searched = res.data.data
        })

      },
      _initData: function(data={}){
        const _this = this
        this.$axios.get( this.$api.good,data).then(res=>{ 
          _this.pageSet.totalRow = res.data.total
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
        
      },
      pageChange: function(pInfo){

        //{pageNumber: 1, pageSize: 10}
        // console.log(pInfo);

        this._initData({
          params:{
            page: pInfo.pageNumber,
            phpsize: pInfo.pageSize,
            cate: this.currentCate,
            name: this.search,
            color: this.currentColor
          }
        })

      }


      
    },
    components: {
      foot
    },
    watch: {
      isSearch:function(newVal,oldVal){
        // console.log( oldVal ) console.log( newVal )
        this.searchIcon = !newVal ? 'fa-angle-double-left' :'fa-angle-double-right'
      }
    }
  }
</script>

<style lang="css">
  .md-field {
    max-width: 100%;
  }
  .md-table-cell .md-table-cell-container{
    font-size: 14px;
    padding: 0;
  }
  .md-table-cell{
    height: 40px;
  }
  .md-table-content table{
    margin-bottom: 30px;
  }
  .md-card .md-toolbar{
    padding:10px;
    border-bottom: 1px solid rgba(224,224,224,1);
  }
  .md-input{
    height:20px;
    font-size:14px;
  }

  .search-state{
    position: fixed;
    top: 110px;
    right: 0;
    z-index: 99999;
    padding: 4px;
    background: rgba(68,138,255, 0.8);
  }
  .vPagination{
    font-size:14px;
    padding-bottom:20px;
  }
  /* .md-table-fixed-header-container thead tr th:first-child div:first-child{
    width:185px; 
  } */
</style>