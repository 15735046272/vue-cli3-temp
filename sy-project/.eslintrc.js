module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    /*总是在对象属性的末尾加分号*/
    'semi': ['error', 'always'],
    /*总是在对象属性的末尾加逗号*/
    'comma-dangle': ['error', 'always'],
    /*逗号的后面一定要有空格*/
    'comma-spacing':0,
    /*不关注多余空白行*/
    'no-multiple-empty-lines': 0,
    /*行尾添加空格*/
    'no-trailing-spaces': 0,
    /*在函数括号之前没有空格*/
    'space-before-function-paren': ['error', 'never'],
    /*允许使用new不将结果对象分配给变量*/
    'no-new': 0,
    /*缩进*/
    'indent': 0,
    /*没有定义的*/
    'no-unused-vars': 0,
    /*字符串使用单双引号，必须一致*/
    'quotes': 0,
    /* 不允许在大括号之间留出空格  */
    'object-curly-spacing': 0,
    /* 大括号空格允许有0个或1个 */
    "standard/object-curly-even-spacing": [2, "either"],
    /* 围绕if,function 关键字使用空格 */
    'keyword-spacing': 0,
    /* 运算符左右可以没有空格 */
    'space-infix-ops': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
