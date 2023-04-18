<template>
  <div class="table">
    <el-table
      v-drag="move"
      :data="tableData"
    >
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="txt"
        label="其他"
      />
      <el-table-column
        prop="txt1"
        label="剩余展示文案"
      />
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'TableDrag',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.tableData.push({
          name: `这是第${i}个测试数据`,
          txt: '其他文案1',
          txt1: '这事其他文案2'
        })
      }
    }, 100)
  },
  methods: {
    move (start, end) {
      if (start === end || end - start === 1) {
        return
      }
      const moveRow = this.tableData[start]
      this.tableData.splice(start, 1)
      if (start > end) {
        this.tableData.splice(end, 0, moveRow)
      } else {
        this.tableData.splice(end - 1, 0, moveRow)
      }
    }
  }
}
</script>
