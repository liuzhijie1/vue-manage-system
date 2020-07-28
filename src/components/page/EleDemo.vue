<template>
  <div class="wrapper">
    <el-container style="height:400px;border:2px solid #eee">
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>导航</template
            >
            <el-menu-item-group>
              <template slot="title"><i class="el-icon-message"></i>分组一</template>
              <el-menu-item index="1-1">选项 1</el-menu-item>
              <el-menu-item index="1-2">选项 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title"><i class="el-icon-message"></i>分组二</template>
              <el-menu-item index="1-3">选项 3</el-menu-item>
              <el-menu-item index="1-4">选项 4</el-menu-item>
              <el-submenu index="1-5">
                <template slot="title"><i class="el-icon-message"></i>选项 5</template>
                <el-menu-item index="1-5-1">选项 5-1</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <!-- 下拉菜单 -->
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>AsunaCC</span>
        </el-header>
        <!-- 主要区域容器 -->
        <el-main>
          <!-- 表格 -->
          <el-table :data="tableData" style="border: 1px solid #eee">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2019-09-17",
      name: "shiyanlou",
      address: "四川省成都市",
    };
    return {
      tableData: Array(10).fill(item),
    };
  },
  created () {
      console.log(this.$route);
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
