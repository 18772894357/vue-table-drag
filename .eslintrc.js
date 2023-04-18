module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    globalLog: true,
    globalWarn: true,
    globalError: true
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: { // 支持装饰器
      legacyDecorators: true
    }
  },
  rules: {
    'no-var': 'error',
    eqeqeq: 'error',
    'vue/eqeqeq': 'error',
    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: false,
      ignores: ['pre', 'textarea'],
      allowEmptyLines: false
    }],
    'vue/no-v-html': 0,
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 2
    }],
    'vue/singleline-html-element-content-newline': ['off', {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea', 'p']
    }],
    'vue/no-use-v-if-with-v-for': 0,
    'vue/no-mutating-props': 0
  }
}
