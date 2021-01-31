<template>
    <div>
        <el-bread></el-bread>
        <el-button @click="open" type='success' size='small'>添加</el-button>
        <g-dialog ref="fdd" @close='close' :goodsInfo='goodsInfo'></g-dialog>
        <g-list @edit='edit'></g-list>
    </div>
</template>

<script>
import gDialog from './addInfo'
import gList from './goodsList'
export default {
    data() {
        return {
            goodsInfo:{
                isShow:false,
                isAdd:true
            }
        };
    },
    components:{
        gDialog,
        gList
    },
    methods: {
        open(){
            this.goodsInfo.isShow=true;
        },
        close(){
            this.goodsInfo.isShow=false;

        },
        edit(id){
            // console.log(id,'ii');
            this.goodsInfo.isShow=true;
            this.goodsInfo.isAdd=false;
            this.$refs.fdd.lookInfo(id)
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
