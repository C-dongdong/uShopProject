<template>
    <div>
        <el-bread></el-bread>
        <el-button type="primary" @click="add"  plain size="small">添加</el-button>
        <add-list ref="rdd" :roleInfo='roleInfo'  @cancel='close'></add-list>
        <r-list @edit='editRole'></r-list>
    </div>
</template>
<script>
import rList from './roleList.vue'
import addList from './addRole'
export default {
    data() {
        return {
            // isShow:false
            roleInfo:{
                isShow:false,
                isAdd:true
            }
        };
    },
    components:{
        rList,
        addList
    },
    methods: {
        add(){
            // console.log('hh');
            this.roleInfo.isShow=true
        },
        close(e){
            this.roleInfo.isShow=e
        },
        editRole(e){
            // console.log('ppppp');
            // console.log(e,'00');
            this.roleInfo.isShow=true
            this.roleInfo.isAdd=false
            this.$refs.rdd.lookUp(e)
        }
    },
};
</script>

<style  lang="" scoped>
.el-button{
    float: left;
    margin:10px 0px ;
}
</style>
