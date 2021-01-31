import axios from 'axios'
import router from '../../router'
let http  = axios.create({
    baseURL:'/api'
})
//axios拦截
//请求拦截
http.interceptors.request.use(req=>{
    // console.log(req,'请求拦截');
    // console.log(sessionStorage.getItem('loginInfo'),'2');
    let token=sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')).token:''
    // console.log(token,'kkk');
    req.headers.authorization=token;
    return req
})
//响应拦截  一般用于全局拦截错误
http.interceptors.response.use(res=>{
    // console.log(res,'响应');
    if(res.data.code===500){
        alert(res.data.msg)
        // console.log(router,'路由配置项');
        router.push('/login')
    }else if(res.data.code ===403){
        //token验证过期，重新登录
        alert(res.data.msg)
        router.push('/login')
    }else{
        //针对于返回内容进行二次拆分
        return res
    }
})


export default http