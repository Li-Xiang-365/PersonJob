# 个人博客项目

一个基于 Vue 3 + Vite 构建的现代化个人博客系统，具有美观的界面和丰富的交互体验。

## 项目特点

- 🌟 基于 Vue 3 Composition API 开发
- 🎨 使用 Ant Design Vue 和 Element Plus 双 UI 框架
- 🌌 动态星空背景效果，支持交互
- 📱 响应式设计，完美适配各种设备
- 🚀 基于 Vite 构建，开发体验流畅
- 📝 支持文章分类、标签和搜索功能
- 💬 评论系统
- 🌐 多语言支持（计划中）

## 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite
- **UI 框架**：Ant Design Vue + Element Plus
- **路由管理**：Vue Router 4
- **状态管理**：Pinia
- **样式预处理**：Less
- **开发工具**：Vue DevTools

## 项目结构

```
src/
├── api/          # API 接口
├── assets/       # 静态资源
├── components/   # 公共组件
├── directives/   # 自定义指令
├── mock/         # 模拟数据
├── router/       # 路由配置
├── stores/       # 状态管理
├── utils/        # 工具函数
└── views/        # 页面组件
```

## 开始使用

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0

### 安装依赖

```sh
npm install
```

### 开发环境

```sh
npm run dev
```

### 生产环境构建

```sh
npm run build
```

### 预览构建结果

```sh
npm run preview
```

## 开发指南

### 添加新文章

1. 在 `src/views/blog/articles/` 目录下创建新的文章组件
2. 在 `src/router/index.js` 中添加对应的路由配置
3. 更新文章列表数据

### 自定义主题

1. 修改 `src/assets/styles/` 下的样式文件
2. 使用 Less 变量进行全局主题定制

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 许可证

[MIT](LICENSE)

