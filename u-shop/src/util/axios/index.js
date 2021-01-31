import http from './axios'

export function addMenu(data){
    return http.post('/api/menuadd',data)
}
export function getMenuList(){
    return http.get('/api/menulist?istree=1')
}
export function delMenu(data){
    return http.post('/api/menudelete',data)
}
//封装菜单列表获取一条数据接口
export function menuInfo(params){
    return http.get('/api/menuinfo',{
        params
    })
}
//封装菜单列表编辑接口
export function editMenu(data){
    return http.post('/api/menuedit',data)
}
//添加角色
export function addRole(data){
    return http.post('/api/roleadd',data)
}
//获取角色列表
export function getRoleList(){
    return http.get('/api/rolelist')
}
//删除某一个角色
export function delRole(data){
    return http.post('/api/roledelete',data)
}
//获取角色中的某一条信息
export function getOneRole(params){
    return http.get('/api/roleinfo',{
        params
    })
}
//编辑角色
export function editRole(data){
    return http.post('/api/roleedit',data)
}
//添加管理员
export function addManger(data){
    return http.post('/api/useradd',data)
}
//获取管理员列表
export function getMangerList(params){
    return http.get('/api/userlist',{
        params
    })
}
//获取管理员总数
export function getMangerNumber(params){
    return http.get('/api/usercount',{
        params
    })
}
//删除一条管理员记录
export function delManger(data){
    return http.post('/api/userdelete',data)
}
//获取一条管理员记录
export function getMangerOne(params){
    return http.get('/api/userinfo',{
        params
    })
}
//修改管理员信息
export function updatedManger(data){
    return http.post('/api/useredit',data)
}
//管理员登录
export function userLogin(data){
    return http.post('/api/userlogin',data)
}
//添加商品分类
export function addSort(data){
    return http.post('/api/cateadd',data)
}
//封装分类列表接口
export function getCateList(){
    return http.get('/api/catelist',{
        params:{
            istree:true
        }
    })
}
//封装分类删除接口
export function getCateDelete(data){
    return http.post('/api/catedelete',data)
}
//封装分类获取（一条）接口
export function getCateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
//封装分类修改接口
export function getCateEdit(data){
    return http.post('/api/cateedit',data)
}
//商品规格添加
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
    // console.log('uu');
    return http.get('/api/specsinfo',{
        params
    })
}
//商品规格修改
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
    return http.get('/api/specscount')
}
//商品管理添加
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
//商品管理列表
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
//商品管理总数（用于计算分页)
export function getGoodsCount(){
    return http.get('/api/goodscount')
}
//商品管理删除
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
//商品管理修改
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}
//商品管理获取（一条）
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
//封装轮播图添加接口
export function getBannerAdd(data){
    return http.post('/api/banneradd',data)
}
//封装轮播图列表接口
export function getBannerList(){
    return http.get('/api/bannerlist')
}
//封装轮播图获取（一条）接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
//封装轮播图修改接口
export function getBannerEdit(data){
    return http.post('/api/banneredit',data)
}
//封装轮播图删除接口
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}
//封装限时秒杀添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
//封装限时秒杀列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}
//封装限时秒杀获取（一条）接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
//封装限时秒杀修改接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
//封装限时秒杀删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}
//封装会员管理列表接口
export function getMemberList(){
    return http.get('/api/memberlist')
}
//封装会员管理获取（一条）接口
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
//封装会员管理修改接口
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}
