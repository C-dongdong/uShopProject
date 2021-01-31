import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import banner from './modules/banner'
import seck from './modules/seck'
import member from './modules/member'

export default new Vuex.Store({
    state:{
        loginInfo:sessionStorage.getItem('loginInfo')? JSON.parse(sessionStorage.getItem('loginInfo')): null  //个人信息
    },
    getters:{
        getUserInfo(state){
            return state.loginInfo
        }
    },
    mutations:{
        CHANGE_USER(state,payload){
            state.loginInfo = payload
            if(payload){
                sessionStorage.setItem('loginInfo',JSON.stringify(payload))
            }else{
                sessionStorage.removeItem('loginInfo')
            }
        }
    },
    actions:{
        changeUserInfoAction(contxt,payload){
            contxt.commit('CHANGE_USER',payload)
        }
    },
    modules:{
        menu,
        role,
        manger,
        cate,
        specs,
        goods,
        banner,
        seck,
        member
    }
})
