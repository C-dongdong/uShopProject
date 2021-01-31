<template>
    <div>
        <!-- <h1>管理员管理</h1> -->
        <el-bread></el-bread>
        <el-button @click="open" type='success' size='small'>添加</el-button>
        <m-dialog ref="getOne" :MangerInfo='MangerInfo' @cancel='close' @change='chang'></m-dialog>
        <m-list ref="chan" @edit='edit'></m-list>
    </div>
</template>

<script>
import mDialog from './addManger'
import mList from './mangerList'
export default {
    data() {
        return {
            MangerInfo:{
                isShow:false,
                isAdd:true
            }
        };
    },
    components:{
        mDialog,
        mList
    },
    methods: {
        open(){
            this.MangerInfo.isShow=true
        },
        close(){
            // console.log(e,'e');
            this.MangerInfo.isShow=false
        },
        chang(){
            this.$refs.chan.getNumber();
            // this.$refs.chan.get
        },
        edit(uid){
            this.MangerInfo.isShow=true;
            this.MangerInfo.isAdd=false;
            this.$refs.getOne.lookManger(uid)
        }
    },
};
</script>

<style  lang="" scoped>
.el-button{
    float: left;
    margin: 10px 0px;
}
</style>
