## 数据格式

```javascript
options: {
  formSchame: {
    name: {
      label: '姓名',
      component: 'el-input',
      rrules: {
        required: true
      }
    },
    age: {
      label: '名称',
      component: 'custom-render',
      render: (h) => {
        return (
          <span>其他自定义组件或者文案等</span>
        )
      }
    },
    other: {
      [object]: {
        name: {
          label: '姓名',
          component: 'el-input'
        }
      }
    }
  }
}
```

## 特点

### 1、支持将 json 格式化成 form 表单，rules 以及联动等功能

### 2、支持深度嵌套表单渲染

### 3、支持 slot 和 jsx render 模式，便于灵活扩展其他组件的嵌入和更改

## 案例

yarn serve 启动查看
