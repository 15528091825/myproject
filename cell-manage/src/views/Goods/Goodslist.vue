<template>
    <div class="goodslist">
        <el-table :data="tableData" size="mini" height="600px" style="width: 100%" @row-click="tt" ref="tabledata"
            class="tabledata">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品 ID:">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="所属分类:">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>

                        <el-form-item label="商品评价:">
                            <span>{{ props.row.rating }}</span>
                        </el-form-item>

                        <el-form-item label="商品名称:">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="商品价格:">
                            <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间:">
                            <span>{{ props.row.ctime }}</span>
                        </el-form-item>
                        <el-form-item label="商品销量:">
                            <span>{{ props.row.sellCount }}</span>
                        </el-form-item>

                        <el-form-item label="商品图片:">
                            <span><img :src="baseImgUrl+'/'+props.row.imgUrl" alt=""></span>
                        </el-form-item>

                        <el-form-item label="商品描述:">
                            <span>{{ props.row.goodsDesc }}</span>
                        </el-form-item>

                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name">
            </el-table-column>
            <el-table-column label="所属分类" prop="category">
            </el-table-column>
            <el-table-column label="商品价格" prop="price" width="150px">
            </el-table-column>
            <el-table-column label="商品图片" width="150px" align="center">
                <template slot-scope="scope">
                    <img prop="imgUrl" :src="baseImgUrl+'/'+scope.row.imgUrl">

                </template>
            </el-table-column>
            <el-table-column label="商品描述" width="300px"  prop="goodsDesc" :show-overflow-tooltip="true">

            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
            :total="totalpage">
        </el-pagination>

        <!--编辑的模态框 -->

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <!-- 修改的内容 -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini"
                class="demo-ruleForm">

                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="category">
                    <el-select v-model="ruleForm.category" placeholder="请选择商品分类">
                        <el-option v-for="(item,i) in catedata" :key="i" :label="item.cateName" :value="item.cateName">
                        </el-option>

                    </el-select>
                </el-form-item>

                <el-form-item label="商品图片">
                    <el-upload :show-file-list="false" :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload" class="avatar-uploader  sssupload"
                        action="http://127.0.0.1:5000/goods/goods_img_upload">
                        <img v-if="ruleForm.imgUrl" :src="baseImgUrl + '/'+ruleForm.imgUrl" class="avatar"
                            prop="imgUrl" />

                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </el-form-item>

                <el-form-item label="商品价格" prop="price">
                    <el-input-number v-model="ruleForm.price" @change="handleChange" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="活动形式" prop="goodsDesc" class="goodsdesc">
                    <el-input type="textarea" v-model="ruleForm.goodsDesc">
                    </el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editForm">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { goodsList,goodsEdit,cateAll,delAdd } from "@/api/goods"
    export default {
        data() {
            return {
                imageUrl: '',
                // 商品分类
                catedata: [],
                // 分页数据
                pagesize: 5,
                totalpage: 0,
                currentPage: 1,
                tableData: [],
                // 配置图片路径
                baseImgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img",
                // 控制模态框
                dialogVisible: false,
                ruleForm: {
                    id: "",
                    name: "",
                    category: "",
                    price: '',
                    goodsDesc: "",
                    imgUrl: ''

                },

                rules: {
                    name: [{
                        required: true,
                        message: "请输入商品名称",
                        trigger: "blur"
                    }, ],
                    category: [{
                        required: true,
                        message: "请选择商品分类",
                        trigger: "change"
                    }],
                    price: [{
                        required: true,
                        message: "请填写价格",
                        trigger: "change"
                    }],
                    goodsDesc: [{
                        required: true,
                        message: "请填写商品描述",
                        trigger: "blur"
                    }],
                    imgUrl: [{
                        required: true,
                        message: "图片必填",
                        trigger: "blur"
                    }],

                }
            }

        },
        methods: {
            // 分页数据
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.getlist();
            },
            //改变当前页
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getlist();
            },
            // 编辑当前信息
            edit(row) {
                this.dialogVisible = true;
                // console.log("这是要编辑的商品",row.id)
                // 原来的信息回显
                this.ruleForm = {
                    ...row
                }


            },
            // 保存编辑
            editForm() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        let data = {
                            ...this.ruleForm
                        }

                        // console.log(data)
                        let {
                            code,
                            msg
                        } = await goodsEdit(data)
                        if (code == 0) {
                            this.dialogVisible = false;
                            // 从新获取列表
                            this.getlist();
                            // 清空上传图
                            this.imageUrl = "";

                        }
                    } else {
                        this.$message.error("验证不通过")
                    }
                })

            },

            // 删除当前信息
            async del(row) {
                // console.log("这是要编辑的商品",row.id)
                let {
                    code,
                    msg
                } = await delAdd({
                    id: row.id
                })
                if (code === 0) {
                    // 重新获取列表
                    this.getlist();
                }
            },

            tt(row, column, event) {
                // console.log("ddddd", row)
            },
            // 获取商品列表
            async getlist() {

                let {
                    data,
                    total
                } = await goodsList({
                    currentPage: this.currentPage,
                    pageSize: this.pagesize
                });
                if (total) {
                    this.tableData = data;
                    this.totalpage = total

                }
            },
            // 获取商品分类列表
            async getcate() {
                let {
                    categories
                } = await cateAll()
                // console.log(categories)
                if (categories) {
                    this.catedata = categories;
                }
            },
            handleChange(value) {
                // console.log(value);
            },
            // 图片上出的处理
            handleAvatarSuccess(res, file) {
                let {
                    code,
                    msg,
                    imgUrl
                } = res
                // console.log(res)
                if (code == 0) {
                    // 将成功的url地址
                    this.ruleForm.imgUrl = imgUrl

                    this.$message({
                        type: "success",
                        message: msg
                    })
                } else {
                    this.$message.error(msg)
                }

            },
            //  图片上传前的处理
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 多图删除处理
            handleRemove(file, fileList) {
                console.log(file.response.imgUrl);
                this.imageUrl.splice((this.imageUrl.indexOf(file.response.imgUrl)), 1)

            },
            // 图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }


        },
        created() {
            this.getlist();
            this.getcate()

        }
    };
</script>

<style lang="less" scoped>
    .goodslist {
        padding: 15px;
        margin-top: 15px;
        .tabledata {
            /deep/img {
                width: 100px;
                height: 100px;
                vertical-align: middle;
            }

            


        }

        .el-pagination {
            margin-top: 20px;
        }

        .demo-table-expand {
            font-size: 0;
        }

        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }

        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }

        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409eff;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }

        .avatar {
            width: 100px;
            height: 100px;
            display: block;
        }
    }
    
</style>