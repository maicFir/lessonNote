/*
 * @Author: maicFir anne.duan@aax.com
 * @Date: 2022-08-27 12:58:23
 * @LastEditors: maicFir anne.duan@aax.com
 * @LastEditTime: 2022-08-28 10:23:14
 * @FilePath: /lessonNote/vue/04-select下拉框虚拟列表/elem-select/.eslintrc.js
 * @Description: 
 */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        semi: ["off", "always"]
    }
}
