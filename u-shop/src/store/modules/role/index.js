//引入接口文件
import {getRoleList} from '../../../util/axios'

const state={
    roleList:[]
}
const getters={
    getRoleListGetters(state){
        return state.roleList
    }
}
const mutations={
    GETROLELIST(state,payload){
        state.roleList=payload
    }
}
const actions={
    getRoleListActions({commit}){
        getRoleList()
        .then(res=>{
            if(res.data.code==200){
                // console.log(res.data,'juse');
                commit('GETROLELIST',res.data.list)
            }else{
                console.log('获取角色列表出错');
            }
            
        })
        .catch(err=>{
            console.log(err);
        })

    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}