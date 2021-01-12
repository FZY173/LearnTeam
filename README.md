# Learning Team

## 基本信息
## 目录结构 (main)

```
.
├── code // 代码库
│   ├── demo // 代码演示demo
│   └── utils 工具库
├── document
│   ├── encryptionAlgorithm // 加密算法
│   ├── frontEnd // 前端相关知识文档
│   ├── git // Git相关知识文档
│   └── product // 产品相关知识文档
└── public // 静态资源
    └── images 

```

## 安装

### 1. 安装 `node_modules`

```sh
npm i
```

### 2. VSCode 插件，并保证他们都能正常工作。

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

`.vscode/settings.json` 文件中工作区的配置正常情况下在每次保存文件时都会自动格式化，以及修复问题。

```json
{
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "window.zoomLevel": 1,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "search.followSymlinks": false,
  "search.exclude": {
    "**/*.bundle": true,
    "**/*.map": true
  },
  "stylelint.enable": true,
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```


### git 分支

- master  主分支，一般情况下 master 分支不进行直接开发。
- feature 新功能开发分支，若有子分支，可以 feature/[username] 或 feature-features 方式命名 。 
- bugfix  问题修复分支，子分支可参考 feature 分支命名。

### 推荐

- 代码 commit 之前，过一遍所有变更（推荐用 SourceTree 之类的可视化工具）。