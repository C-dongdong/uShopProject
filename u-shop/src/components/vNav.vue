<template>
    <div>
         <el-menu
            default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#3d5f81"
            active-text-color="#ffd04b"
             unique-opened
            text-color="#fff"
             router>
             <el-menu-item index="/home">
                <i class="el-icon-menu"></i>
                <span slot="title">首页 </span>
                </el-menu-item>
            <el-submenu v-for="item in navList" :key="item.id.toString()" :index="item.id.toString()">
               <template slot="title">
                <i :class="item.icon"></i>
                <span class="system">{{item.title}}</span>
              </template> 
                <el-menu-item v-for="list in item.children" :key="list.id" :index="list.url">{{list.title}}</el-menu-item>
            </el-submenu>
          </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultActive:'/home',
            navList:[]
        };
    },
    mounted() {
      this.defaultActive=this.$route.path
      if(sessionStorage.getItem('loginInfo')){
        this.navList=JSON.parse(sessionStorage.getItem('loginInfo')).menus
      }
  },
};
</script>
<style  lang="" scoped>
.el-menu{
    border-right: none ;
    background-color: #3d5f81;
}
</style>
