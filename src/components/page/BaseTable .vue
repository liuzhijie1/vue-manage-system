<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
          >批量删除</el-button
        >

        <el-select
          v-model="query.address"
          placeholder="地址"
          class="handle-select mr10"
        >
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>

        <el-input
          v-model="query.name"
          placeholder="用户名"
          class="handle-input mr10"
        ></el-input>

        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <!-- header-cell-class-name="table-header" 这个标签的class类是加载在组件中的，所以要在组件中，或者全局设置样式。加了scope无法设置 -->
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="账户余额">
          <template v-slot="scope">￥{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template v-slot="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="状态" align="center">
          <template v-slot="scope">
            <el-tag
              :type="
                scope.row.state === '成功'
                  ? 'success'
                  : scope.row.state === '失败'
                  ? 'danger'
                  : ''
              "
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="date" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>

      <el-dialog title="编辑" :visible="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button @click="saveEdit" type="primary">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { fetchData } from "../../api/index";
export default {
    data(){
        return {
            query:{
                address:'',
                name:'',
                pageIndex:1,
                pageSize:10,
            },
            tableData:[],
            multipleSelection:[],
            delList:[],
            editVisible:false,
            pageTotal:0,
            form:{},
            idx:-1,
            id:-1,
        }
    },
    created () {
        this.getData();
    },
    methods: {
        getData() {
            fetchData(this.query).then((res)=>{
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        handleSearch(){
            this.$set(this.query,'pageIndex',1);
            this.getData();
        },
        handleDelete(index,row){
            this.$confirm('确定要删除吗?','提示',{
                type:'warning',
            }).then(()=>{
                this.$message.success('删除成功');
                this.tableData.splice(index,1);
            }).catch(()=>{});
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        delAllSelection(){
            const length = this.multipleSelection.length;
            if(length){
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for(let i=0;i<length;i++){
                    str += this.multipleSelection[i].name+' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            }else{
                this.$message.error('未选中列表');
            }
        },
        handleEdit(index,row){
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        saveEdit(){
            this.editVisible = false;
            this.$message.success(`修改第${this.idx + 1}行成功`);
            this.$set(this.tableData,this.idx,this.form);
        },
        handlePageChange(val){
            this.$set(this.query,'pageIndex',val);
            this.getData();
        }
    },
};
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
.table{
    width: 100%;
    font-size: 14px;
}
.red{
    color: #ff0000;
}
.mr10{
    margin-right: 10px;
}
.table-td-thumb{
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
