<template>
  <div>
    <el-container>
      <el-header>XXXX大型后台管理系统
         <div class="userInfo">
          <span>{{getUserInfo.username}}</span>
          <el-button @click="logout" type='danger' size='mini'>退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
         <v-nav></v-nav>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from '../components/vNav'
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
         isCollapse: false
    };
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  components:{
    vNav
  },
  // mounted() {
  //   this.changeUserInfoAction()
  // },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    //退出事件
    logout(){
      //修改getUserInfo它的仓库状态然后跳转到登录
      this.changeUserInfoAction(null)
      this.$router.push('/login')
    }
  },
};
</script>

<style  lang="" scoped>
.el-header {
  background-color: #518ecb;
  color: #333;
  line-height: 60px;
  height: 10vh;
}
.userInfo{
  float: right;
}
.el-aside {
  background-color: #3d5f81;
  color: #333;
  /* text-align: center; */
  height: 90vh;
}
.el-menu-item-group__title{
    background-color: #d3dce6;
}
.el-submenu__title{
    color: white !important;
}
/* .text-color{
    color: white;
} */
.el-menu{
    height: 100vh;
    background-color: #3d5f81;
    color: white !important;
    border-right: none  !important;
}
.el-menu-item{
    background-color: #3d5f81;
}

.el-submenu .el-menu-item.is-active{
    color:#ffd04b;
}
/* .title{
    float: left;
} */
.active-text-color{
    color: yellow;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
