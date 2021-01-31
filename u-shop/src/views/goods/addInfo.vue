<template>
    <div>
         <el-dialog
      center
      :before-close="cancel"
      :title="goodsInfo.isAdd ? '添加用户' : '编辑用户'"
      :visible.sync="goodsInfo.isShow"
      @opened='createEditor'
      >
      <el-form :model="goodsForm"   ref="ruleForm">
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select @change='changeCate' v-model="goodsForm.first_cateid" placeholder="请选择">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

         <el-form-item
          prop="goodsname"
          label="商品名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="price"
          label="价格"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="market_price"
          label="市场价格"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.market_price" autocomplete="off"></el-input>
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
                > 
                <i class="el-icon-plus"></i>
            </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="75%" :src="dialogImageUrl" alt="">
                </el-dialog>
          </el-form-item> 

           <el-form-item
          prop="specsid"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-select @change='changeSpecs' v-model="goodsForm.specsid" placeholder="请选择">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="specsattr"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-select v-model="goodsForm.specsattr" placeholder="请选择">
            <el-option
              v-for="item in specswh"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
         <el-radio-group v-model="goodsForm.isnew">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="2">否</el-radio>
        </el-radio-group>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
         <el-radio-group v-model="goodsForm.ishot">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="2">否</el-radio>
        </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>

         <el-form-item  label="商品描述"
          :label-width="formLabelWidth">
          <div id='editor'></div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="goodsInfo.isAdd" @click="add('ruleForm')" type="primary"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
    </div>
</template>
<script>
import E from 'wangeditor'
import {mapGetters,mapActions} from 'vuex'
import {getSpecsList,getGoodsAdd,getGoodsInfo,getGoodsEdit} from '../../util/axios'
export default {
    data() {
        return {
          goodsForm: {
            first_cateid: "", //一级分类编号
            second_cateid: "", //二级分类编号
            goodsname: "", //商品名称
            price: "", //商品价格
            market_price: "", //市场价格
            img: "", //商品图片（文件）
            description: "", //商品描述
            specsid: "", //商品规格编号
            specsattr: "", //商品规格属性
            isnew: 1, //是否新品 1是新品 2是否
            ishot: 1, //是否热卖推荐1是热卖 2是否
            status: 1 //1是正常2禁用
          },
          formLabelWidth:"120px",
          secondCate:[],
          dialogImageUrl:'',
          dialogVisible: false,
          imgUrl:'',
          fileList:[],//
          specsList:[],//规格名称列表数组
          specswh:[], //规格属性数组
          editor:null,
          rules: {
            goodsname:[
              { required: true, message: "请输入商品名称", trigger: "blur" },
              { min: 2, max: 8, message: "长度在 2到 8 个字符", trigger: "blur" }
              ],
              price:[
              { required: true, message: "请输入商品价格", trigger: "blur" },
              { min: 1, max: 8, message: "长度在 1到 8 个字符", trigger: "blur" }
              ],
              market_price:[
              { required: true, message: "请输入商品市场价格", trigger: "blur" },
              { min: 1, max: 8, message: "长度在 1到 8 个字符", trigger: "blur" }
              ],
              first_cateid: [{ required: true, message: "请选择一级分类", trigger: "change" }],
              second_cateid: [{ required: true, message: "请选择二级分类", trigger: "change" }],
              specsid: [{ required: true, message: "请选择商品规格", trigger: "change" }],
              specsattr: [{ required: true, message: "请选择规格属性", trigger: "change" }]
          },
        };
    },
    props:['goodsInfo'],
    mounted() {
      this.getSpecCount();
      this.getCateListAction();
      this.getSpecsListt();
      // this.cresteEditor();
    },
    computed:{
      ...mapGetters({
        cateList:'cate/getCateList',
        specCount:'specs/getCountNum'
      })
    },
    methods: {
      cancel(){
        this.$emit('close')
      },
      createEditor(){
        this.editor=new E('#editor')
        this.editor.create();
        console.log(this.editor,'配置项');
        if(this.goodsInfo.isAdd){
          this.editor.txt.html('')
        }else{
          this.editor.txt.html(this.goodsForm.description);
        }
        
      },
      add(){
          this.goodsForm.description = this.editor.txt.html()
          this.goodsForm.img=this.imgUrl;
          let file=new FormData();
          for(let i in this.goodsForm){
            file.append(i,this.goodsForm[i])
          }
         getGoodsAdd(file)
         .then(res=>{
           if(res.data.code==200){
              this.cancel()
            this.getGoodsListAction();
              //重新调取总条数
            this.getCountAction();
             this.$message.success(res.data.msg);
           }else{
             this.$message.error(res.data.msg);
           }
         })
         .catch(err=>{
            console.log("error submit!!");
            return false;
         })
      },
      lookInfo(id) {
      //调取查询接口
      console.log(id,'dd');
      getGoodsInfo({id}).then(res => {
        console.log(res, "查询商品一条数据结果");
        if (res.data.code === 200) {
          console.log(res,'res');
          // this.changeCate(res.data.list.first_cateid);
           this.goodsForm = res.data.list;
           this.goodsForm.id = id;
           
          this.fileList = this.goodsForm.img
            ? [{ url: this.$imgUrl + this.goodsForm.img }]
            : "";
            this.changeCate(true);
            this.changeSpecs(true);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
      update(id){
        this.goodsForm.description = this.editor.txt.html()
          this.goodsForm.img=this.imgUrl;
          let file=new FormData();
          for(let i in this.goodsForm){
            file.append(i,this.goodsForm[i])
          }
          getGoodsEdit(file)
          .then(res=>{
            if(res.data.code==200){
               this.cancel();
              this.getGoodsListAction();
              this.imgUrl='';
              this.$message.success(res.data.msg);
            }else{
               this.$message.error(res.data.msg);
            }
          })
          .then(err=>{
             console.log("error submit!!");
              return false;
          })
      },
      ...mapActions({
        getCateListAction:'cate/getCateListAction',
        getSpecCount:'specs/getCountAction',
        getGoodsListAction: "goods/getGoodsListAction",
        getCountAction: "goods/getCountAction",
      }),
      changeCate(n){
        let index=this.cateList.findIndex(item=>
          this.goodsForm.first_cateid==item.id
        )
        this.secondCate=this.cateList[index].children;
        if(!n){
          this.goodsForm.second_cateid=''
        }
      },
      changeSpecs(n){
        // console.log(id,'iddd');
        console.log(this.specsList,'sp');
        console.log(this.goodsForm.specsid,'ss');
         let index=this.specsList.findIndex(item=>
          this.goodsForm.specsid==item.id
        )
        console.log(index,'index');
        this.specswh=this.specsList[index].attrs;
        if(!n){
          this.goodsForm.specsattr=''
        }
      },
      getSpecsListt(){
        console.log(this.specCount,'this');
        getSpecsList({size:9999,page:1})
        .then(res=>{
          console.log(res,'spec');
          this.specsList=res.data.list
        })
      },
      //当文件改变时，触发的函数方法
      onChange(file) {
        // console.log(file, "文件的属性配置");
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
