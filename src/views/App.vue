<template>
  <div
    id="app"
    style="padding: 20px; overflow-x: hidden;"
  >
    <DynamicForm
      ref="form"
      :options="options"
      :form="form"
    />
    <div style="text-align: center; border-top: 1px solid #ccc;margin-top: 20px; padding-top: 20px;">
      <el-button @click="handleClear">清空</el-button>
      <el-button
        type="primary"
        @click="handleCommit"
      >
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
import DynamicForm, { array, object } from '@/components/dynamic-form'

export default {
  name: 'App',
  components: {
    DynamicForm
  },
  data () {
    return {
      options: {
        labelWidth: '120px',
        gutter: 20,
        formSchema: {
          name: {
            label: '姓名',
            component: 'el-input',
            span: 8,
            rules: {
              required: true, message: '请输入姓名'
            }
          },
          age: {
            label: '年龄',
            component: 'el-input-number',
            span: 8,
            rules: {
              required: true, message: '请输入年龄'
            }
          },
          hobby: {
            label: '爱好',
            component: 'custom-render',
            span: 8,
            render: (h) => {
              const handleChange = (val) => {
                this.form.hobby = val
              }
              return (
                <div>
                  喜欢<el-input-number value={this.form.hobby} onInput={handleChange} />个人打游戏
                </div>
              )
            }
          },
          familyTitle: {
            label: '家庭成员',
            component: 'custom-render',
            render: (h) => {
              const handleAdd = () => {
                this.form.family.push({})
              }
              return (
                <el-button onClick={handleAdd}>增加</el-button>
              )
            }
          },
          family: {
            labelWidth: '0px',
            [array]: {
              name: {
                label: '姓名',
                component: 'el-input',
                span: 8,
                rules: {
                  required: true, message: '请输入家庭成员的姓名'
                }
              },
              age: {
                label: '年龄',
                component: 'el-input',
                span: 8
              },
              buttons: {
                component: 'custom-render',
                span: 8,
                render: (h) => {
                  const handleDelete = (e, c) => {
                    const index = (e.target.parentElement.closest('button') ?? e.target).getAttribute('index')
                    this.form.family.splice(index, 1)
                  }
                  return (
                    <el-button style="margin-left: 10px" type="danger" onClick={handleDelete}>删除</el-button>
                  )
                }
              }
            }
          },
          otherTitle: {
            label: '其他'
          },
          other: {
            [object]: {
              food: {
                label: '喜欢吃的食物',
                component: 'el-input',
                span: 8
              },
              work: {
                label: '工作',
                component: 'el-input',
                span: 8
              },
              game: {
                label: '喜欢的游戏',
                component: 'el-input',
                span: 8
              }
            }
          }
        }
      },
      form: {
        name: 'zs',
        age: undefined,
        family: [],
        other: {}
      }
    }
  },
  methods: {
    // 提交
    handleCommit () {
      this.$refs.form.onCommit().then(data => {
        this.$alert(JSON.stringify(data))
      })
    },
    // 清空
    handleClear () {
      this.$refs.form.onReset()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
