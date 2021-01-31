<template>
    <div>
         <el-dialog
      :title="bannerInfo.isAdd ? '添加分类' : '编辑分类'"
      center
      :visible.sync="bannerInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="bannerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="轮播图名称："
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="bannerForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-if="bannerForm.id != 0"
          label="图片"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            :auto-upload="false"
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
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="bannerForm.status"
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
        <el-button v-if="bannerInfo.isAdd" @click="add('ruleForm')" type="primary"
          >确 定</el-button
        >
        <el-button v-else @click="update('ruleForm')" type="primary"
          >编辑</el-button
        >
      </div>
    </el-dialog>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {getBannerAdd,getBannerInfo,getBannerEdit} from '../../util/axios'
export default {
    data() {
        return {
            bannerForm:{
                title:"",//轮播图名称
                img:'',//图片(文件)
                status:1,//状态1正常2禁用
            },
            rules:{
                title: [
                { required: true, message: "请输入轮播图名称", trigger: "blur" },
                { min: 2, max: 8, message: "长度在 2到 8 个字符", trigger: "blur" }
                ],
            },
            formLabelWidth: "120px", //label宽度
            dialogImageUrl: "", //预览图片地址
            dialogVisible: false, //预览的弹框默认是false
            imgUrl: "", //文件图片的配置对象
            fileList: [] //文件列表
        };
    },
    props:['bannerInfo'],
    computed:{

    },
    methods: {
        ...mapActions({
             getBannerListAction:'banner/getBannerListAction'
        }),
        cancel(){
            this.$emit('close');
            this.reset();
            this.imgUrl=''
            this.$refs.upload.clearFiles();
        },
        add(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
          this.bannerForm.img = this.imgUrl;
           let file = new FormData();
          for (let i in this.bannerForm) {
            file.append(i, this.bannerForm[i]);
          }
          getBannerAdd(file).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              console.log(res,'res');
              //成功之后关闭弹框以及重置
              this.cancel();
              this.reset()
              //重新调取接口列表
              this.getBannerListAction();
              this.imgUrl=''
              this.$refs.upload.clearFiles();
            } else {
              this.$message.error(res.data.msg);
            }
          })
         } else {
            console.log("error submit!!");
            return false;
            }
        });
        },
        lookUp(id){
            getBannerInfo({id})
            .then(res=>{
                if(res.data.code==200){
                     this.bannerForm = res.data.list;
                    this.bannerForm.id = id;
                    //当查询数据调取接口，给fileList数组赋值
                    this.fileList = this.bannerForm.img
                    ? [{ url: this.$imgUrl + this.bannerForm.img }]
                    : [];
                    }
            })
        },
        update(formName){
            // console.log(id,'iii');
            this.$refs[formName].validate(valid => {
            if (valid) {
                this.bannerForm.img = this.imgUrl ? this.imgUrl : this.bannerForm.img;
                //对于有上传文件的数据，我们要用构造函数FormData去转化
                let file = new FormData();
                 for (let i in this.bannerForm) {
                file.append(i, this.bannerForm[i]);
                }
                getBannerEdit(file)
                .then(res=>{
                    if(res.data.code==200){
                        this.$message.success(res.data.msg);
                        this.getBannerListAction()
                        this.cancel();
                        this.reset()
                        this.imgUrl=''
                        this.$refs.upload.clearFiles();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                   
                })
            }else{
                console.log("error submit!!");
                return false;
            }
            })
        },
         //当文件改变时，触发的函数方法
        onChange(file) {
        console.log(file, "文件的属性配置");
        this.imgUrl = file.raw;
        },
     reset() {
      this.bannerForm = {
        title:'',//轮播图名称
        img:'',//图片(文件)
        status:1,//状态1正常2禁用
      };
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
    //文件上传的限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    },
};
</script>

<style  lang="" scoped>

</style>
