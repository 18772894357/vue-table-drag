<template>
  <el-form
    ref="form"
    v-bind="{ ...options }"
    :model="form"
    class="simple-form"
    v-on="{ ...options.on }"
    @submit.native.prevent
  >
    <SimpleFormItem
      :slots="$slots"
      :options="options"
      :form="form"
      @validateField="validateField"
    >
      <!-- 内容插槽转接 -->
      <div
        v-for="(slot, index) in Object.keys($slots || {})"
        :key="index"
        :slot="slot"
      >
        <div>
          <slot :name="slot" />
        </div>
      </div>
    </SimpleFormItem>
  </el-form>
</template>
<script>
import SimpleFormItem from './form-item.vue'
export default {
  name: 'SimpleForm',
  components: {
    SimpleFormItem
  },
  inheritAttrs: false,
  props: {
    form: {
      type: Object,
      default: () => { }
    },
    options: {
      type: Object,
      default: () => { }
    },
    handleOk: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {}
  },
  methods: {
    // 提交
    onCommit () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid, object) => {
          if (valid) {
            resolve(this.form)
          } else {
            this.$message.warning('当前有必填项目未填写！')
            reject(object)
          }
        })
      })
    },
    // 重置
    onReset () {
      return new Promise((resolve) => {
        this.$refs.form.resetFields()
        resolve()
      })
    },
    // 某个字段校验
    validateField (field) {
      try {
        this.$refs.form.validateField(field)
      } catch (e) { }
    },
    // 全部重置
    resetFields () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
