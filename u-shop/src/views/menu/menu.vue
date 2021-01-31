<template>
    <div>
         <el-bread></el-bread>
        <el-button @click='toOpen' type="primary" plain size="small">添加</el-button>
        <g-diog ref='vAdd' @cancel='cancel' :addInfo ='addInfo'></g-diog>
        <v-list @edit='edit'></v-list>
    </div>
</template>

<script>
import gDiog from './addinfo'
import vList from './list'
export default {
    data() {
        return {
             addInfo:{
                 isShow:false,//控制弹框打开关闭
                 isAdd:true  //用于控制添加或编辑
             }
        };
    },
    components:{
        gDiog,
        vList
    },
    methods: {
        toOpen(){
        this.addInfo.isShow = true,
        this.addInfo.isAdd =true
        },
        cancel(e){
        this.addInfo.isShow =e
        },
        edit(e){
            // console.log(e,'父');
            this.addInfo.isShow=true,
            this.addInfo.isAdd=false,
            // console.log(this.$refs.vAdd,'ooooo');
            this.$refs.vAdd.lookUp(e)
        }
    },
};
</script>

<style  lang="" scoped>
.el-button{
    float: left;
    margin-top:10px ;
}
</style>
