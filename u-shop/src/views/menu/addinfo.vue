<template>
    <div>
    <el-dialog
      :title="addInfo.isAdd?'添加菜单':'编辑菜单'"
      center
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="menuList" :rules="rules" ref="ruleForm">
        <el-form-item label="菜单名称：" prop='title' :label-width="formLabelWidth">
          <el-input v-model="menuList.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单：" prop='pid' :label-width="formLabelWidth">
          <el-select v-model="menuList.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <el-radio v-model="menuList.type" :label="1">目录</el-radio>
          <el-radio v-model="menuList.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item v-if="menuList.type==1" label="菜单图标：" :label-width="formLabelWidth">
         <el-select v-model="menuList.icon" placeholder="请选择">
            <el-option label="菜单图标" :value="1"></el-option>
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="menuList.type==2" label="菜单地址：" :label-width="formLabelWidth">
         <el-select v-model="menuList.url" placeholder="请选择">
            <el-option label="菜单地址" :value="0"></el-option>
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="menuList.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add('ruleForm')" type="primary">确 定</el-button>
         <el-button v-else @click="update('ruleForm')"  type="primary">编辑</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import {addMenu,menuInfo,editMenu} from '../../util/axios'
import {indexRouters} from '../../router/index'
import {mapActions,mapGetters} from 'vuex'
// console.log(indexRouters,'111111');
export default {
    data() {
        return {
            menuList:{
               pid: 0, //上级分类编号 int型
              title: "", //标题
              icon: "", //图标
              type: 1, //类型1目录2菜单
              url: "", //菜单地址
              status: 1 //状态1正常2禁用
            },
            rules: {
              title:[
                { required: true, message: "请输入菜单名称", trigger: "blur" },
                { min: 2, max: 6, message: "长度在 2到 6 个字符", trigger: "blur" }
                ],
              pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }]
            },
            formLabelWidth: '120px',//label宽度
            
                iconList: [
                  "el-icon-s-tools",
                  "el-icon-setting",
                  "el-icon-s-goods",
                  "el-icon-goods"
                ], //图标列表
                indexRouters:indexRouters
        };
    },
    computed:{
      ...mapGetters({
        'options':'menu/getMenuList'
      })
    },
    methods: {
       ...mapActions({
        'getMenuList':'menu/getMenuListAction'
        }),
      cancel(){
           this.$emit('cancel',false),
           this.reset()
      },
      reset() {
      this.menuList = {
        pid: 0, //上级分类编号 int型
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1 //状态1正常2禁用
      };
      },
       add(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
             addMenu(this.menuList)
              .then(res=>{
                this.$message.success('信息添加成功')
                this.cancel();
                this.getMenuList()
              })
              .catch(err=>{
                this.$message.err('信息添加失败')
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       console.log(this.menuList,'表单体');
      
    },
    lookUp(id){
      menuInfo({
        id
      })
      .then(res=>{
        if(res.data.code==200){
          this.menuList=res.data.list
          this.menuList.id=id
        }
      })
    },
   update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editMenu(this.menuList).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //成功之后关闭弹框以及重置
              this.cancel();
              //重新调取接口列表
              this.getMenuList()
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          // console.log('不行');
          console.log("error submit!!");
          return false;
        }
      });
    },

    },
     props: ["addInfo"],
   
};
</script>

<style  lang="" scoped>

</style>
