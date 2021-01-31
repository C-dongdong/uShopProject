<template>
    <div>
        <el-bread></el-bread>
        <el-button @click='toOpen' type="primary" plain size="small">添加</el-button>
        <s-dialog ref="dialog" @cancel="cancel" :addInfo="addInfo"></s-dialog>
        <s-list @edit="edit"></s-list>
    </div>
</template>

<script>
import sDialog from './addInfo'
import sList from './list'
export default {
    data() {
        return {
            addInfo:{
                isShow: false, //弹框打开关闭
                isAdd: true, //添加还是编辑
            }
        };
    },
    components:{
        sDialog,
        sList
    },
    methods: {
        toOpen(){
             this.addInfo.isShow = true;
            this.addInfo.isAdd = true;
        },
        cancel(){
            this.addInfo.isShow = false;
        },
         //子组件触发父组件联动编辑
        edit(e) {
        this.addInfo.isShow = true;
        this.addInfo.isAdd = false;
        this.$refs.dialog.look(e);
        },
       
    },
};
</script>

<style  lang="" scoped>
.el-button{
    float: left;
    margin: 10px 0px;
}
</style>
