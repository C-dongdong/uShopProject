//引入接口文件
import {getMangerList} from '../../../util/axios'
const state={
    mangerList:[],
    page:{
        size:4,
        page:1
    }
}
const getters={
    mangerGetter(state){
        return state.mangerList
    },
    getSize(state){
        return state.page.size
    }
}
const mutations={
    mangerList(state,payload){
        state.mangerList=payload
    },
    changePage(state,payload){
        // console.log(payload,'qqq');
        state.page.page=payload
    },
    //修改页码
     CHANGE_PAGE(state,payload){
        //  console.log(payload,'pay');
        state.page.page = payload
    }

}
const actions={
    getMangerListActions(payload){
        // console.log(payload,'p');
        getMangerList(state.page)
        .then(res=>{
            if(res.data.code==200){
                // console.log(res,'res');
                let list=res.data.list ? res.data.list:[];
                payload.commit('mangerList',list)
                if(payload.state.page.page!=1&&list.length==0){
                    payload.dispatch('changePageAction',payload.state.page.page-1)
                    return
                }
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
    changePageAction(context,payload){
        context.commit('CHANGE_PAGE',payload)
        context.dispatch('getMangerListActions')
        return
    }
}
export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}