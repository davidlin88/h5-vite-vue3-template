# h5-vite-vue3-template

开箱即用的 h5 开发模板。技术栈：Vite/Vue3/Scss/

## 目录简介

```bash

├── index.html               # index.html 模板
├── jsconfig.json            # JavaScript 配置
├── package.json             # package.json
├── public                   # 静态资源目录（不会被处理）
│   ├── favicon.ico          # 图标
│   └── fixIosTitle.html     # 用于载入ifame以设置ios网页title
├── src                      # 主要源代码目录
│   ├── App.vue              # 主要app组件
│   ├── api                  # api服务目录
│   │   ├── map.js           # 服务端数据映射
│   │   └── request.js       # 网络请求器
│   ├── assets               # 静态资源（会被vite处理）
│   ├── components           # 组件目录
│   ├── config               # 静态配置
│   ├── main.js              # app入口文件
│   ├── pages                # 页面目录
│   ├── router               # 路由
│   ├── store                # 全局状态
│   ├── styles               # 全局样式目录
│   │   ├── base.scss        # 基础样式
│   │   ├── iconfont.scss    # 图标字体样式
│   │   ├── index.scss       # 全局样式入口
│   │   ├── mixins.scss      # 样式函数
│   │   ├── vant.scss        # 复写UI组件样式
│   │   └── vars.scss        # 样式变量
│   └── utils                # 工具
│       ├── auth.js          # 权限处理
│       ├── filters.js       # 渲染用的全局方法
│       ├── index.js         # 通用工具方法
│       └── storage.js       # 存储相关方法
├── vite.config.js           # vite配置

```

## 依赖

自作主张地引入了觉得好用的依赖：

- eslint：用于代码风格检测
- prettier：用于代码格式化
- vite-plugin-pages：自动按目录生成页面路由
- unplugin-vue-components：自动按需引入组件
- vant：优秀的移动端 UI 框架，支持 Vue3
- vite-plugin-style-import：按需引入 vant 的样式文件
- postcss-px2vp：用于将设计稿的 px 转换为 vw 单位
