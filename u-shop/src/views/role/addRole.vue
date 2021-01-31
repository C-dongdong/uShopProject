<template>
    <div>
        <el-dialog
        :title="roleInfo.isAdd?'添加角色':'编辑角色'"
        center
        :visible.sync='roleInfo.isShow'
        :before-close="cancel"
        >
            <el-form :model="role" ref="roleForm" :rules="rules" label-width="100px">
                <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="role.rolename" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" >
                <el-tree
                    :data="menuList"
                    show-checkbox
                    check-strictly
                    default-expand-all
                    node-key="id"
                    ref="tree"
                    :props="{
                        children: 'children', //树形层级
                        label: 'title' //展示的内容  title指得的是菜单名称
                    }"
                    >
                    </el-tree>
                </el-form-item>
                <el-form-item label='状态'>
                    <el-switch
                        v-model="role.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="2">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                <el-button @click="cancel">取消</el-button>
                <el-button v-if="roleInfo.isAdd" @click="add('roleForm')" type="primary">确定</el-button>
                <el-button v-else @click="edit('roleForm')" type="primary">编辑</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {addRole,getOneRole,editRole} from '../../util/axios'
export default {
    data() {
        return {
            role: {
               rolename:'', //角色名称
               menus:'' ,//角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
               status:1  //状态1正常2禁用
                },
                defaultProps:{
                     children: "children",
                     label: "title"
                },
            rules:{
              rolename:[
                { required: true, message: "请输入角色名称", trigger: "blur" },
                { min: 2, max: 8, message: "长度在 2到 8 个字符", trigger: "blur" }
                ]
            },
            reset:{
                rolename:'', 
                menus:[] ,
                status:1  
            }
        };
    },
    computed:{
        ...mapGetters({
            'menuList':'menu/getMenuList'
        })
    },
    mounted() {
        this.getMenuList();
    },
    methods: {
        cancel(){
            this.$emit('cancel',false)
        },
        ...mapActions({
          getRoleList:'role/getRoleListActions',
          getMenuList:'menu/getMenuListAction'
        }),
        add(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.role.menus=this.$refs.tree.getCheckedKeys();
                // this.role.menus = this.$refs.tree.getCheckedKeys().join(",");
                 console.log(this.role,'添加');
                addRole(this.role)
                .then(res=>{
                    console.log(this.role,'role');
                    this.$message.success('信息添加成功');
                    this.cancel();
                    this.getRoleList();
                    this.role=this.reset
                })
                .catch(err=>{
                    this.$message.err(err,'信息添加失败')
                })
            }else{
                 console.log('error submit!!');
                return false;
            }
        })
        },
        lookUp(id){
            // console.log(id,'id');
            getOneRole({id})
            .then(res=>{
                if(res.data.code==200){
                    // console.log(res);
                    this.role=res.data.list
                    this.role.id=id
                    this.$refs.tree.setCheckedKeys(res.data.list.menus.split(','));
                    
                }else{
                    console.log('获取角色信息错误');
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
        edit(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.role.menus=this.$refs.tree.getCheckedKeys();
                console.log(this.role,'role');
                editRole(this.role)
                .then(res=>{
                   this.$message.success('信息编辑成功');
                    this.role=this.reset
                     this.$refs.tree.setCheckedKeys([]);
                     this.getRoleList()
                     this.cancel()
                })
                .catch(err=>{
                     console.log(err);
                    this.$message.error('信息编辑失败');
                })
            }else{
                console.log('error submit!!');
                return false;
            }
            })
        }
    },
    props:['roleInfo']
};
</script>

<style  lang="" scoped>
.el-dialog__header {
    padding: 0px !important;
}
</style>
