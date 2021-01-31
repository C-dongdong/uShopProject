<template>
  <div>
    <template >
      <el-table :data="roleList"
       border style="width: 100%"
       >
        <el-table-column prop="id" label="角色编号" width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态"> 
        <template slot-scope="cpp">
             <el-button v-if="cpp.row.status==1"  type="success" plain size="small">启用</el-button>
            <el-button v-else  type="info" plain size="small">禁用</el-button>
        </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
        <template slot-scope="item">
        <div>
            <el-button type="primary" @click="edit(item.row.id)" size="small">编辑</el-button>
            <el-button type="danger" @click="del(item.row.id)" size="small"
              >删除</el-button
            >
        </div>
        </template>
        </el-table-column>
      </el-table>
    </template>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {delRole} from '../../util/axios'
export default {
  data() {
    return {
    };
  },
  mounted(){
      this.getRoleList()
  },
  methods: {
      ...mapActions({
          getRoleList:'role/getRoleListActions'
      }),
      del(id){
            this.$confirm("你确定要删除吗？？？？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(()=>{
                delRole({id})
                    .then(res=>{
                        this.$message.success('删除成功');
                        this.getRoleList();
                    })
                    .catch(err=>{
                        this.$message.error('删除失败');
                    })
            })
            .catch(()=>{
                console.log('删除失败');
            })
      },
      edit(id){
          this.$emit('edit',id)
        //   console.log(id);
      }
  },
  computed:{
      ...mapGetters({
          roleList:'role/getRoleListGetters'
      })
    
  }
};
</script>

<style  lang="" scoped>
.el-table__header tr,.el-table__header th{
    padding: 0;
    height: 10px ;
}
.has-gutter{
    height: 10px;
}
</style>
