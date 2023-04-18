<template>
  <el-row v-bind="{...options,...options.rowAttrs}">
    <el-col
      v-for="key of Object.keys(options.formSchema)"
      :key="key"
      v-bind="{
        ...options.formSchema[key],
        ...options.formSchema[key].colAttrs,
        span: options.formSchema[key].span || 24,
      }"
    >
      <template v-if="$slots[`${propPreFix}${key}`]">
        <slot :name="`${propPreFix}${key}`" />
      </template>
      <template v-else-if="options.formSchema[key][object]">
        <SimpleFormItem
          :form="form[key]"
          :options="{
            ...options.formSchema[key],
            formSchema: options.formSchema[key][object],
          }"
          :prop-pre-fix="`${propPreFix}${key}.`"
          @validateField="validateField"
        />
      </template>
      <template v-else-if="options.formSchema[key][array]">
        <el-form-item
          v-for="(innerForm, innerIndex) in form[key]"
          :key="innerIndex"
          v-bind="{
            ...options.formSchema[key],
            ...checkFn(options.formSchema[key].itemAttrs, innerForm, innerIndex),
            prop: `${propPreFix}${key}.${innerIndex}`,
          }"
        >
          <SimpleFormItem
            :form="form[key][innerIndex]"
            :options="{
              ...options.formSchema[key],
              formSchema: checkFn(options.formSchema[key][array], innerIndex),
            }"
            :prop-pre-fix="`${propPreFix}${key}.${innerIndex}.`"
            :index="innerIndex"
            @validateField="validateField"
          />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item v-bind="{ ...options.formSchema[key], ...options.formSchema[key].itemAttrs, prop: `${propPreFix}${key}`}">
          <component
            :is="options.formSchema[key].component"
            v-model="form[key]"
            :value="form[key]"
            :prop-pre-fix="`${propPreFix}${key}`"
            :index="index"
            v-bind="{
              placeholder: forcePlaceholder(options.formSchema[key]),
              ...(options.formSchema[key].type === 'select' || options.formSchema[key].component === 'a-tree-select' || options.formSchema[key].component === 'el-range-picker' ? {
                getPopupContainer: triggerNode => triggerNode.parentNode,
              } : {}),
              ...options.formSchema[key],
              ...options.formSchema[key].componentAttrs
            }"
            v-on="{
              ...options.formSchema[key].on,
              validateField: validateField
            }"
          />
          <span
            v-if="options.formSchema[key].suffix"
            class="m-l-5 display-inline-block w-25 text-right"
          >
            {{ options.formSchema[key].suffix }}
          </span>
        </el-form-item>
      </template>
    </el-col>
  </el-row>
</template>
<script>
import { array, object } from './constants'
import CustomRender from './components/custom-render'
export default {
  name: 'SimpleFormItem',
  components: {
    'custom-render': CustomRender
  },
  inheritAttrs: false,
  props: {
    propPreFix: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => { }
    },
    form: {
      type: Object,
      default: () => { }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      object: object,
      array: array
    }
  },
  methods: {
    forcePlaceholder (item) {
      if (item.component === 'el-range-picker') {
        return ['开始日期', '结束日期']
      }
      const prefix = item.type === 'select' || item.component === 'el-tree-select' ? '请选择' : '请输入'
      return `${prefix}${item.label || ''}`
    },
    validateField (field) {
      this.$emit('validateField', field)
    },
    checkFn (fn, record, index) {
      if (fn && fn instanceof Function) {
        return fn(record, index)
      } else {
        return fn
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
