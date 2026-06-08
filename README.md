# 哲理源 · 个人博客前端

<p align="center">
  <img src="public/blog.svg" alt="哲理源" width="80" height="80" />
</p>

<p align="center">
  <a href="https://www.zlyhub.com">🌐 在线预览</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.21.0-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1.13-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Zustand-4.5.5-433E38?logo=zustand&logoColor=white" alt="Zustand" />
</p>

---

## 📖 项目简介

**哲理源** 是一个基于 React + TypeScript 构建的现代化个人博客系统前端应用。项目采用前后端分离架构，涵盖前台博客展示与后台内容管理两大模块，支持 Markdown 编辑与实时预览、标签/分类体系、时间归档等完整博客功能。

线上地址：[https://www.zlyhub.com](https://www.zlyhub.com)

后端仓库：[my_blog_back](https://github.com/zeyuanHong0/my_blog_back)

## 🛠️ 技术栈

| 领域      | 技术选型                        |
| --------- | ------------------------------- |
| 核心框架  | React 18.3.1 + TypeScript 5.5.3 |
| 构建工具  | Vite 5.4.1                      |
| 路由管理  | React Router DOM 6.26.1         |
| 状态管理  | Zustand 4.5.5                   |
| 样式方案  | Tailwind CSS 4.1.13             |
| UI 组件库 | Radix UI + Ant Design 5.20.2    |
| Markdown  | ByteMD 1.22.0（编辑 & 渲染）    |
| 图标方案  | @iconify/react + lucide-react   |
| 动画引擎  | Framer Motion 12.23.12          |
| 表单处理  | React Hook Form + Zod 验证      |
| HTTP 请求 | Axios 1.7.4                     |
| 实时通信  | WebSocket                       |
| 代码质量  | ESLint 9.9.0 + Prettier 3.5.3   |

## 功能特性

### 前台展示

- **首页** — Hero 区域 + 精选博客展示
- **博客列表** — 分页浏览、搜索筛选
- **博客详情** — Markdown 渲染、代码高亮、目录导航
- **标签系统** — 标签云、按标签筛选文章
- **分类系统** — 分类导航、按分类归档
- **时间归档** — 按时间线回顾文章

### 后台管理

- **仪表板** — 数据概览
- **博客管理** — 完整 CRUD + Markdown 编辑器
- **标签管理** — 标签的增删改查
- **分类管理** — 分类的增删改查
- **用户管理** — 超级管理员权限控制
- **登录认证** — 账号密码登录 + GitHub OAuth

## 快速开始

### 环境要求

- **Node.js** >= 22.21.0（推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理版本）
- **npm** >= 10.x

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd blog-front

# 使用项目指定的 Node 版本
nvm use

# 安装依赖
npm install
```

### 开发运行

```bash
# 启动开发服务器（自动打开浏览器）
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 即可看到应用。

### 构建部署

```bash
# 生产构建
npm run build

# 预览构建产物
npm run preview
```

### 全部命令

| 命令               | 用途                             |
| ------------------ | -------------------------------- |
| `npm run dev`      | 启动开发服务器（自动打开浏览器） |
| `npm run dev:prod` | 以生产环境配置启动开发服务器     |
| `npm run dev:test` | 以测试环境配置启动开发服务器     |
| `npm run host`     | 启动局域网可访问的开发服务器     |
| `npm run build`    | 生产环境构建                     |
| `npm run lint`     | ESLint 代码检查                  |
| `npm run preview`  | 预览生产构建产物                 |


## License

本项目为个人博客项目，仅供学习参考。
