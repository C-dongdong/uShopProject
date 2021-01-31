<template>
    <div>
        <el-bread></el-bread>
        <el-button @click="open" type='success' size='small'>添加</el-button>
        <s-dialog ref="edd" :sortInfo='sortInfo' @close='close'></s-dialog>
        <s-list @edit='edit' ></s-list>
    </div>
</template>

<script>
import sDialog from './addSort'
import sList from './sortList'
export default {
    data() {
        return {
            sortInfo:{
                isShow:false,
                isAdd:true
            }
        };
    },
    components:{
        sDialog,
        sList
    },
    methods: {
        close(){
            this.sortInfo.isShow=false
        },
        open(){
             this.sortInfo.isShow=true
              this.sortInfo.isAdd=true
        },
        edit(id){
            this.sortInfo.isShow=true;
            this.sortInfo.isAdd=false
            this.$refs.edd.lookUp(id)
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
