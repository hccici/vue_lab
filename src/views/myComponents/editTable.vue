<template>
  <div class="table-demo">
    <el-form ref="tableForm" :model="tableForm" size="mini">
      <el-table ref="savetable" :data="tableForm.tableData" highlight-current-row class="state-table">
        <el-table-column :prop="'userid.value'" label="账号" />
        <el-table-column prop="name" label="姓名" edit>
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.name.value`" :rules="rules.name">
              <span v-if="!scope.row.name.edit">{{ scope.row.name.value }}</span>
              <el-input v-else :ref="'name' + scope.row.name.id" v-model="scope.row.name.value" placeholder="请输入" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="活动地址" edit>
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.address.value`" :rules="rules.address">
              <span v-if="!scope.row.address.edit">{{ scope.row.address.value }}</span>
              <el-input v-else :ref="'address' + scope.row.address.id" v-model="scope.row.address.value"
                placeholder="请输入" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="部门" edit>
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.department.value`" :rules="rules.department">
              <span v-if="!scope.row.department.edit">{{ scope.row.department.value }}</span>
              <el-select v-else :ref="'department' + scope.row.department.id" v-model="scope.row.department.value"
                clearable placeholder="请选择" size="mini">
                <el-option label="区域一" value="区域一" />
                <el-option label="区域二" value="区域二" />
                <el-option label="区域三" value="区域三" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" edit>
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.date.value`" :rules="rules.date">
              <span v-if="!scope.row.date.edit">{{ scope.row.date.value }}</span>
              <el-date-picker v-else :ref="'date' + scope.row.date.id" v-model="scope.row.date.value"
                value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="!scope.row.name.showSave">
              <i class="ipd-font-icon icon-writing" style="color: #1890FF;" @click.stop="editRow(scope.row)">编辑</i>
              <i class="ipd-font-icon icon-del" style="color: #1890FF;margin-left: 5px;"
                @click.stop="deleteRow(scope.$index)">删除</i>
            </div>
            <div v-else>
              <span style="color: #1890FF;cursor: pointer;" @click.stop="saveRow(scope.row, scope.$index)">保存</span>
              <span style="color: #1890FF;margin-left: 5px;cursor: pointer;"
                @click.stop="cancel(scope.row, scope.$index)">取消</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button @click="validate">校验</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableForm: {
        tableData: [
          { userid: 'l78787089', name: '顾问', department: '区域三', address: '上海', date: '2017-12-13' },
          { userid: 'l78787089', name: '顾问', department: '区域一', address: '深圳', date: '2019-09-20' },
          { userid: '100154564', name: '顾问', department: '区域二', address: '', date: '2019-01-16' },
          { userid: 'l78787089', name: '顾问', department: '区域二', address: '深圳', date: '2014-12-06' },
          { userid: 'l78787089', name: '顾问', department: '区域一', address: '伦敦', date: '2011-06-01' }
        ]
      },
      saveData: [],
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getTableDate()
  },
  methods: {
    getTableDate() {
      this.tableForm.tableData.forEach((item, index) => {
        for (let key in item) {
          item[key] = {
            id: index, // 为每个编辑框添加唯一的标识
            value: item[key],
            edit: false, // 是否显示输入框
            showSave: false // 是否显示保存
          }
        }
      })
      this.saveData = JSON.parse(JSON.stringify(this.tableForm.tableData))
    },
    // 编辑
    editRow(row) {
      this.changeEdit(row, true)
      // this.$refs.savetable.setCurrentRow(row)
      // 可设默认第一个聚焦
      // this.$nextTick(() => {
      //   this.$refs['name0'].focus()
      // })
    },
    cancel(row, index) {
      this.changeEdit(row, false, index)
    },
    deleteRow(index) {
      this.tableForm.tableData.splice(index, 1)
    },
    // 编辑状态改变
    changeEdit(row, status, index) {
      for (let key in row) {
        if (row[key]) {
          if (!status) row[key].value = this.saveData[index][key].value
          this.$nextTick(() => {
            row[key].edit = status
          })
          row[key].showSave = status
        }
      }
    },
    // 保存数据
    saveRow(row, index) {
      let flag = false
      for (let key in row) {
        if (row[key]) {
          // 单独校验编辑行数据
          this.$refs['tableForm'].validateField(`tableData.${index}.${key}.value`, (valid) => {
            if (valid) flag = true
          })
        }
      }
      if (flag) return

      // 单独返回编辑行数据
      let obj = {}
      for (let key in row) {
        if (row[key]) {
          row[key].edit = false
          row[key].showSave = false
        }
        obj[key] = row[key].value
      }
      this.$message.success('保存成功')
      console.log(obj)
    },
    // 校验
    validate() {
      console.time()
      this.$refs.tableForm.validate(() => {
        console.timeEnd()
      })
    }
  }
}
</script>