<template>
    <div>
        <!-- <h1>规格管理</h1> -->
        <el-bread></el-bread>
        <el-button @click="toOpen" type='primary' plain size='small'>添加</el-button>
        <s-dialog ref="vEdit"  @close='close' :specInfo='specInfo'></s-dialog>
        <s-list @edit='edit'></s-list>
    </div>
</template>
<script>
import sDialog from './addInfo'
import sList from './specsList'
export default {
    data() {
        return {
            specInfo:{
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
            this.specInfo.isShow=false
        },
        toOpen(){
            this.specInfo.isShow=true;
            this.specInfo.isAdd=true
        },
        edit(id){
            this.specInfo.isShow=true
            this.specInfo.isAdd=false
            this.$refs.vEdit.lookInfo(id)
        }
    },
};
</script>

<style  lang="" scoped>
.el-button{
    float:left;
    margin: 10px 0px
}
</style>
