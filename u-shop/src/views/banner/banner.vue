<template>
    <div>
    <el-bread></el-bread>
    <el-button @click='toOpen' type="primary" plain size="small">添加</el-button>
    <b-dialog ref="edd" @close='close' :bannerInfo='bannerInfo'></b-dialog>
    <b-list @edit='edit'></b-list>
    </div>
</template>

<script>
import bDialog from './addBanner'
import bList from './bannerList'
export default {
    data() {
        return {
            bannerInfo:{
                isShow:false,
                isAdd:true
            }
        };
    },
    components:{
        bDialog,
        bList
    },
    methods: {
        toOpen(){
            this.bannerInfo.isShow=true;
        },
        close(){
            this.bannerInfo.isShow=false;
        },
        edit(id){
            console.log(id,'iid');
            this.bannerInfo.isShow=true;
            this.bannerInfo.isAdd=false;
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
