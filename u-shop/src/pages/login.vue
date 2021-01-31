<template>
  <div class="login">
    <el-form :model="loginList" :rules="rules" ref="loginRule" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginList.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginList.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginRule')"
          >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {userLogin} from '././../util/axios'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      loginList:{
        username: "",
        password: "",
      },
       rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
          ],
         password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
       }
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
      login(loginRule) {
        this.$refs[loginRule].validate((valid) => {
          if (valid) {
            userLogin(this.loginList)
            .then(res=>{
              if(res.data.code==200){
                console.log(res,'res');
                this.$message.success(res.data.msg)
                // sessionStorage.setItem('loginInfo',JSON.stringify(res.data.list))
                this.changeUserInfoAction(res.data.list)
                console.log('登上了');
                this.$router.push('/home')
              }else{
                this.$message.error(res.data.msg)
              }
            })
            .catch(err=>{
              console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  },
};
</script>

<style  lang="" scoped>
.login{
    width :100vw;
    height :100vh;
    background-color: #8A8B8C;
    text-align: center;
    display: flex;
}
.el-form{
    width: 400px;
    height: 300px;
    margin: auto;
    align-items: center;
}
</style>
