<template>
    <div>
         <el-dialog :title="sortInfo.isAdd ? '添加分类' : '编辑分类'"  :visible.sync="sortInfo.isShow" width="30%" center>
      <el-form
        :model="cateForm"
        :rules="rules"
        ref="sortInfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="cateForm.pid" placeholder="请选择">
               <el-option label="顶级分类" :value="0"></el-option>
            <el-option
            v-for="item in getCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
             ></el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="分类名称" prop="sortname">
          <el-input v-model="cateForm.catename"></el-input>
        </el-form-item>
         <el-form-item label="图片" >
             <el-upload
                action="#"
                :auto-upload='false'
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="onChange"
                :file-list="fileList"
                :limit="1"
                :on-exceed="handleExceed"
                ref="upload"
                > 
                <i class="el-icon-plus"></i>
            </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
          </el-form-item>

        <el-form-item label="状态" prop="status">
            <el-switch
            v-model="cateForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
        </el-switch>
        </el-form-item>
        <el-form-item>
           <el-button @click="cancel">取消</el-button>
          <el-button v-if="sortInfo.isAdd"  type="primary" @click="add('sortInfo')">确定</el-button>
          <el-button v-else type="primary" @click="edit('sortInfo')">编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {addSort,getCateInfo,getCateEdit} from '../../util/axios'
export default {
    data() {
        return {
            cateForm:{
                pid:'',
                catename:'',
                img:'',
                status:1
            },
             rules: {
              catename:[
                    { required: true, message: "请输入菜单名称", trigger: "blur" },
                    { min: 2, max: 8, message: "长度在 2到 8 个字符", trigger: "blur" }
                ],
              pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }]
            },
            roleList:{
            },
            dialogImageUrl: '',
            dialogVisible: false,
            imgUrl:'',
            fileList:[]
        };
    },
    props:['sortInfo'],
    computed:{
       ...mapGetters({
      getCateList: "cate/getCateList"
    })
    },
    mounted() {
      this.getCateListAction()
    },
    methods: {
       //文件上传的限制
    handleExceed(files, fileList) {
        this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
          );
        },
        cancel(){
            this.$emit('close');
            this.reset();
            this.$refs.upload.clearFiles();
        },
         //封装重置函数
        reset() {
          this.cateForm = {
            pid: 0, //上级分类编号 int型
            catename: "", //商品分类名称
            img: "", //图片(文件，一般用于二级分类)
            status: 1 //状态1正常2禁用
          };
          this.fileList=[]
        },
        lookUp(id){
          getCateInfo({id})
          .then(res=>{
            if(res.data.code==200){
              this.cateForm=res.data.list;
              this.cateForm.id=id;
              this.fileList = this.cateForm.img ? [{ url: this.$imgUrl + this.cateForm.img }]:[];
            }
          })
        },
        edit(formName){
           this.$refs[formName].validate(valid => {
        if (valid) {
            this.cateForm.img = this.imgUrl ? this.imgUrl : this.cateForm.img;
            let file=new FormData();
            for(let i in this.cateForm){
              file.append(i,this.cateForm[i]);
            }
            getCateEdit(file).then(res=>{
              if(res.data.code==200){
                this.$message.success(res.data.msg)
                this.cancel();
                this.reset();
                this.getCateListAction()
                this.imgUrl=''
              }else{
                this.$message.error(res.data.msg)
              }
            })
            .catch(err=>{
              console.log(err);
            })
          }else{
             console.log("error submit!!");
              return false;
          }
        })
          
        },
        add(formName){
           this.$refs[formName].validate(valid => {
            if (valid) {
              // console.log(this.cateForm,'k');
                this.cateForm.img=this.imgUrl
                let file=new FormData();
                for(let i in this.cateForm){
                  file.append(i,this.cateForm[i])
                }
                addSort(file)
                .then(res=>{
                  if(res.data.code==200){
                    this.getCateListAction()
                    this.$message.success(res.data.msg)
                    this.cancel();
                  }else{
                     this.$message.error(res.data.msg)
                  } 
                })
            }else{
              console.log("error submit!!");
              return false;
            }
            }) 
        },
       ...mapActions({
          getCateListAction: "cate/getCateListAction"
        }),
        //当文件改变时，触发的函数方法
      onChange(file) {
        console.log(file, "文件的属性配置");
        this.imgUrl = file.raw;
      },
      //预览时的删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style  lang="" scoped>
 
</style>
