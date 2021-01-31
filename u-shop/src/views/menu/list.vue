<template>
    <div>
        <el-table :data="menuList" border style="width: 100%"
         row-key="id"
          default-expand-all
         :tree-props="{children: 'children'}"
        >
        <el-table-column prop="id" label="菜单编号" width="180">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="pid" label="上级菜单"> </el-table-column>
        <el-table-column prop="icon" label="菜单图标" width="180">
        </el-table-column>
        <el-table-column prop="url" label="菜单地址" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态"> 
           <template slot-scope="cpp">
             <el-button v-if="cpp.row.status==1"  type="success" plain size="small">启用</el-button>
            <el-button v-else  type="info" plain size="small">禁用</el-button>
        </template>
        </el-table-column>
        <el-table-column label="操作">
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
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {delMenu} from '../../util/axios'
// console.log(mapGetters,'000');
export default {
    data() {
        return {
        };
    },
    computed:{
        ...mapGetters({
            menuList:'menu/getMenuList'
        })
    },
    mounted() {
        this.getMenuList();
    },
    methods: {
        ...mapActions({
            getMenuList:'menu/getMenuListAction'
        }),
        del(id){
            console.log(id);
            this.$confirm("你确定要删除吗？？？？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                console.log(id,'id');
                delMenu({id})
                .then(res=>{
                    if(res.data.code===200){
                         this.$message.success('删除成功');
                        //当列表删除成功触发行动
                        this.getMenuList();
                    }else{
                         this.$message.error('删除失败');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(()=>{
                
            })
        },
        edit(id){
            console.log(id);
            this.$emit('edit',id)
        }
    },
};
</script>

<style  lang="" scoped>

</style>
