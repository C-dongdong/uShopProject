//引入接口文件
import {getMenuList} from '../../../util/axios'
 //创建一个模块 state
 const state={
     menuList:[]
 }
 //创建getters模块
 const getters={
    getMenuList(state){
        return state.menuList
    }
 }
 //创建mutations模块
 const mutations={
     //获取菜单列表
    GET_MUNULIST(state,payload){
     state.menuList=payload
    }

 }
 //创建actions模块
 const actions={
    getMenuListAction({commit}){
        getMenuList()
        .then(res=>{
            if(res.data.code===200){
                commit('GET_MUNULIST',res.data.list)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
 }
 //导出创建好的模块
 export default {
     state,
     getters,
     mutations,
     actions,
     namespaced:true
 }