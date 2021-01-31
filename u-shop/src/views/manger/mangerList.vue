<template>
  <div>
    <!-- <h1>liebian1</h1> -->
    
      <el-table :data="mangerList" border style="width: 100%">
        <el-table-column prop="uid" label="用户编号" width="180">
        </el-table-column>

        <el-table-column prop="username" label="用户名称" width="180">
        </el-table-column>

        <el-table-column prop="rolename" label="所述角色"> </el-table-column>

         <el-table-column prop="status" label="状态"> 
         <template slot-scope="cpp">
             <el-button v-if="cpp.row.status==1"  type="success" plain size="small">启用</el-button>
            <el-button v-else  type="info" plain size="small">禁用</el-button>
        </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
        <template slot-scope="item">
        <div>
            <el-button type="primary" @click="edit(item.row.uid)" size="small">编辑</el-button>
            <el-button type="danger" @click="del(item.row.uid)" size="small"
              >删除</el-button>
        </div>
        </template> 
        </el-table-column>
           
      </el-table>
       <el-pagination
            background
            :current-page.sync="page"
            @current-change='change'
            layout="prev, pager, next"
            :total="pageNumber">
        </el-pagination>
  </div>
</template>
<script>
import {mapActions,mapGetters,mapMutations} from 'vuex'
import {getMangerNumber,delManger} from '../../util/axios'
export default {
  data() {
    return {
       page:0,
       pageNumber:1
    };
  },
  mounted(){
      this.getNumber();
      this.getMangerList();
  },
  computed:{
        ...mapGetters({
            mangerList:'manger/mangerGetter',
            size:'manger/getSize'
        })
    },
    methods: {
       ...mapActions({
           getMangerList:'manger/getMangerListActions'
       }),
       ...mapMutations({
           changePage:'manger/changePage'
       }),
       change(){
        //    console.log(this.page,'本页');
           this.changePage(this.page);
           this.getMangerList()
       },
        getNumber(){
            // console.log('获得');
            getMangerNumber()
            .then(res=>{
                this.pageNumber=(res.data.list[0].total/this.size)*10
            })
        },
        del(uid){
              this.$confirm("你确定要删除吗？？？？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(()=>{
                 delManger({uid})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code==200){
                        
                            this.getNumber();
                    
                            this.change();
                            this.$message.success('删除完成')
                        }else{
                            this.$message.error('删除失败')
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            })
        },
        edit(uid){
            console.log(uid);
            this.$emit('edit',uid)
        }
    },
};
</script>

<style  lang="" scoped>
</style>
