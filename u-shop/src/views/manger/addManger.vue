<template>
  <div>
    <el-dialog :title="MangerInfo.isAdd?'添加管理员':'编辑管理员'" :visible.sync="MangerInfo.isShow" width="30%" center>
      <el-form
        :model="manger"
        :rules="rules"
        ref="mangerInfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="所属角色" prop="roleid">
          <el-select v-model="manger.roleid" placeholder="请选择">
            
            <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
             ></el-option>
            
          </el-select>
        </el-form-item>

         <el-form-item label="用户名称" prop="username">
          <el-input v-model="manger.username"></el-input>
        </el-form-item>
        
         <el-form-item label="密码" prop="password">
          <el-input v-model="manger.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
            <el-switch
            v-model="manger.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
        </el-switch>
        </el-form-item>

        <el-form-item>
           <el-button @click="cancel">取消</el-button>
          <el-button v-if="MangerInfo.isAdd"  type="primary" @click="addManger('mangerInfo')">确定</el-button>
          <el-button v-else type="primary" @click="edit('mangerInfo')">编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>   
<script>
import {mapGetters,mapActions, mapState} from 'vuex'
import {addManger,getMangerOne,updatedManger} from '../../util/axios'
export default {
  data() {  
    return {
      is: true,
       manger: {
            roleid:''  ,  //角色编号       
            username:'',  //管理员名称     
            password:'' , //密码           
            status:''    //状态1正常2禁用 
        },
        rules: {
              username:[
                { required: true, message: "请输入用户名称", trigger: "blur" },
                { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
                ],
              roleid: [{ required: true, message: "请选择上级菜单", trigger: "change" }]
            },
        
    };
  },
  computed:{
    ...mapGetters({
      roleList:'role/getRoleListGetters'
    })
  },
  mounted() {
    this.getRoleList();
  },
  props: ["MangerInfo"],
  methods: {
    cancel(){
      this.$emit('cancel')
      this.reset()
    },
    reset(){
            this.manger = {
              roleid: "", //角色编号
              username: "", //管理员名称
              password: "", //密码
              status: 1 //1是正常2禁用
            };
        },
    ...mapActions({
      getRoleList:'role/getRoleListActions',
      getMangerList:'manger/getMangerListActions'
    }),
    lookManger(uid){
      getMangerOne({uid})
      .then(res=>{
        // console.log(res,'rss');
        this.manger=res.data.list
        this.manger.uid=uid
      })
      .catch(err=>{
        console.log(err);
      })
    },
    addManger(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
             addManger(this.manger)
              .then(res=>{
                this.$message.success('添加完成')
                this.$emit('change');
                this.cancel()
                this.getMangerList()
              })
              .catch(err=>{
                this.$message.error('添加失败')
              })
          }else{
            console.log('添加错误');
            }
          })
    },
    edit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
             updatedManger(this.manger)
              .then(res=>{
                this.cancel();
                 this.getMangerList()
                this.$message.success('修改完成')
              })
              .catch(err=>{
                this.$message.error('修改失败')
                console.log(err);
              })
          }
      })
    }
  },
};
</script>

<style  lang="" scoped>
</style>
