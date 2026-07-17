# CoderTreasure / 代码宝藏

**A stealthy code-refactoring disguised pairing game for VS Code. 100% looks like a real code editor — even your boss won't notice.**
**一个伪装成代码重构审查的 VS Code 配对消除游戏——极致伪装，老板路过也看不出！**

Plugin developer: Qin Han / 插件开发者：秦瀚

**GitHub**: https://github.com/qinhan5667/codertreasure ⭐ Star 欢迎！

---

## 🎮 一句话介绍

在 VS Code 里打开一个「代码文件」，像做 code review 一样找出重复的关键字并配对消除。从一米外看，你完全是在认真工作。🤫

---

## 📸 效果截图 / Screenshots

### Level 2: Java Spring Boot（Java 关卡）
![Java Level](https://raw.githubusercontent.com/qinhan5667/codertreasure/main/images/screenshot-java-level.png)
*在真实的 Java Controller 代码中找出重复的注解和方法名 — 伪装成严肃的 code review*

### Level 3: TypeScript Composable（TS 关卡）
![TS Level](https://raw.githubusercontent.com/qinhan5667/codertreasure/main/images/screenshot-ts-level.png)
*TypeScript 完整语法高亮 — import、函数、类型、字符串各有颜色*

### 状态栏细节 / Status Bar
![Status Bar](https://raw.githubusercontent.com/qinhan5667/codertreasure/main/images/screenshot-statusbar.png)
*状态栏：只有语言标签和 🔍 可点击，其他为装饰元素*

### 语法高亮效果 / Syntax Highlighting Detail
![TS Colors](https://raw.githubusercontent.com/qinhan5667/codertreasure/main/images/screenshot-ts-colors.png)
*对标 VS Code Dark+ 主题的代码着色效果*

---

## 📖 用户使用指南 / User Guide

### 我下载了这个插件之后怎么用？

**第一步：安装**
1. 在 VS Code 扩展市场搜索 `CoderTreasure`
2. 点「安装」（或从 [Releases](https://github.com/qinhan5667/codertreasure/releases) 下载 .vsix 文件手动安装）
3. **重启 VS Code**

**第二步：启动游戏**
- 按 `Ctrl+Alt+S` 即可启动游戏面板
- 或者 `Ctrl+Shift+P` → 输入 `Start new coding`

**第三步：开始玩**
1. 看到的界面像一个普通的代码编辑器（这正是目的！）
2. 用眼睛扫描代码，找"可疑的重复关键字"
3. 点击第一个 → 再点相同的第二个 → 配对成功！变灰 + 删除线
4. 状态栏的 `✗ N` 数字会递减
5. 全部消除 = 审查完成！

### 界面各区域说明

```
┌─────────────────────────────────────────────┐
│ [V] AuditTimeline.vue ●                ✕  │ ← Tab 栏（当前文件标签）
├─────────────────────────────────────────────┤
│ graziery / src / views / taskAudit / ...    │ ← 面包屑（文件路径）
├──────────┬────────────────────────────────┤
│     1    │ <template>                      │ ← 行号 + 代码区
│     2    │   <div class="detail-aud...">   │     （有完整语法高亮）
│     3    │     <div class="audit-op...">   │
│   ...    │       ...                       │
├──────────┴────────────────────────────────┤
│ ▶main  ✗8  🔍  Vue         Ln1,Col1 UTF-8 ↻│ ← 状态栏
└─────────────────────────────────────────────┘
```

### 状态栏按钮说明（重要！）

| 元素 | 显示 | 可点击？ | 功能 |
|------|------|---------|------|
| **▶ main** | Git 分支名 | ❌ 不可点击 | 纯装饰，伪装成 Git 分支显示 |
| **✗ N** | 剩余配对数 | ❌ 不可点击 | 自动递减，表示还有几对没消除 |
| **🔍** | 放大镜图标 | ✅ **可点击** | 提示功能：高亮下一对可消除的关键字 |
| **Vue / Java / TS** | 语言标签 | ✅ **可点击** | **切换关卡！**循环切换 Vue→Java→TS |
| **Ln X, Col Y** | 光标位置 | ❌ 不可点击 | 装饰性信息 |
| **↻** | 刷新图标 | ✅ **可点击** | 重置当前关卡（重新开始） |

> **总结：只有 🔍、语言标签、↻ 这三个能点。其他都是装饰。**

### 快捷键一览

| 快捷键 | 功能 | 场景 |
|--------|------|------|
| `Ctrl+Alt+S` | 启动游戏面板 | VS Code 全局 |
| `Alt+F12` | 切换 伪装模式 | 游戏内（Boss Key） |
| `Esc` | 立即进入伪装模式 | 游戏内（老板来了！） |
| `Ctrl+L` | 切换到下一关 | 游戏内 |

---

## 🎮 怎么玩 / How to Play

打开游戏后，你会看到一个完全正常的 VS Code 编辑器界面，里面显示一份真实的代码文件（如 `AuditTimeline.vue`）。

1. **鼠标扫描代码**：寻找"可疑的重复关键字"（如出现了两个 `<el-timeline>`）
2. **点击第一个关键字**：蓝色高亮（像选中代码）
3. **点击第二个相同关键字**：两个关键字变为灰色 + 删除线（像标记为删除）
4. **状态栏变化**：`✗ 8` → `✗ 7`，继续扫描...
5. **全部消除**：`✗ 0`，审查完成！

**当前支持 3 个关卡：**

| 关卡 | 文件 | 语言 | 配对数 | 主要配对类型 |
|------|------|------|--------|------------|
| L1 | AuditTimeline.vue | Vue SFC | 8 对 | HTML 标签（`<template>`、`<el-timeline>`） |
| L2 | RelUserCityController.java | Java | 10 对 | 注解（`@PreAuthorize`）、方法名、类型 |
| L3 | useTaskDetail.ts | TypeScript | 8 对 | 函数（`ref(`、`computed(`）、关键字 |

**切换关卡：** 点击状态栏上的语言标签或按 `Ctrl+L`。

**伪装度：** 从 1 米外看，你完全是在认真审查代码。消除后的灰色删除线看起来像 git diff 中被标记删除的代码。

**Boss Key：** 按 `Alt+F12` 或 `Esc` 一键切换到伪装代码页面！

---

## Features / 功能特性

- **极致伪装配对游戏 / Stealth Pairing Game**: 在真实代码文件中找出并消除重复关键字。消除后变为灰色删除线，完全像代码审查过程。
- **多关卡系统 / Multi-Level System**: 3 个初始关卡（Vue / Java / TypeScript），每关使用真实代码文件，独立配对设计。
- **VS Code Dark+ 级语法高亮**: 完整的语法引擎——Template / Script / Style 各自着色规则，Java / JS / CSS 全覆盖。
- **动态代码植入 / Dynamic Code Injection**: 在真实代码中植入重复关键字，每局游戏都有挑战性。
- **Boss Key / 老板键**: 按 `Alt+F12` 立即切换到逼真的伪装代码页面；按 `Esc` 同样生效。
- **用户字体适配**: 自动读取你的 `editor.fontFamily` 和 `editor.fontSize` 设置。
- **Hint 提示系统**: 伪装成 VS Code Search 图标，点击高亮下一对可消除关键字。
- **连击系统 / Combo System**: 连续消除无错误，连击倍数递增。
- **主题切换**: 支持亮/暗主题切换，匹配 VS Code 主题。

---

## How It Works / 游戏原理

游戏界面完全伪装成一个 VS Code 编辑器标签页，加载一份真实的代码文件（如 `AuditTimeline.vue`）。在代码中"植入"了若干对重复的关键字——原本只出现 1 次的关键字，现在变成了 2 次。

玩家需要像真正的代码审查员一样，扫描代码找出这些重复的关键字，点击配对后消除。消除后的关键字变为灰色 + 删除线，保留在代码中，看起来像 git diff 中被标记删除的代码。

状态栏的 `✗ N` 伪装成 lint 错误计数，实际上显示剩余未消除的对数。全部消除后 `✗ 0`，审查完成！

---

## 📁 项目文件结构 / Project Structure

```
codertreasure/
├── src/                          # 源代码
│   ├── extension.ts              # VS Code 扩展入口（注册命令、创建 webview 面板）
│   ├── game.html                 # ⭐ 游戏本体！全部游戏逻辑、UI、语法高亮引擎都在这里
│   └── snippets.json             # 从 GitHub 生成的代码片段数据（可选，构建时注入）
├── dist/                         # 构建输出（编译后的文件）
│   ├── extension.js              # 编译后的扩展代码
│   └── game.html                 # 编译后注入了 snippets 的游戏页面
├── images/                       # 图片资源
│   ├── icon.png                  # 扩展图标
│   └── screenshot-*.png          # 效果截图
├── design/                       # 设计文档
│   ├── GDD.md                    # 游戏设计文档
│   └── Level1-AuditTimeline.md   # 第一关详细设计
├── scripts/
│   └── generate-snippets.js      # 构建：从 GitHub 拉取公开代码片段
├── .vscode/                      # VS Code 配置
│   ├── launch.json               # F5 调试启动配置
│   └── tasks.json                # 构建任务定义
├── esbuild.js                    # esbuild 构建脚本
├── package.json                  # 扩展清单（命令、激活事件、依赖）
├── tsconfig.json                 # TypeScript 配置
├── eslint.config.mjs             # ESLint 配置
├── CHANGELOG.md                  # 变更日志
├── CONTRIBUTING.md               # 贡献指南（如何参与开发、添加新关卡）
└── README.md                     # 你正在看的这个文件
```

---

## ⚙️ 环境要求 & 开发指南 / For Developers

| 工具 | 版本要求 | 用途 |
|------|---------|------|
| **Node.js** | >= 16.x | 运行构建脚本 |
| **npm** | >= 8.x | 安装依赖 |
| **VS Code** | 最新版 | 调试和运行扩展 |
| **@vscode/vsce** | 最新版 | 打包 .vsix 文件（发布时需要） |

### 如何测试 / How to Test

#### 方法一：F5 调试运行（推荐）

```bash
cd codertreasure
npm install        # 安装依赖
# 用 VS Code 打开项目文件夹 → 按 F5 启动调试
# 新窗口中按 Ctrl+Alt+S 启动游戏
```

#### 方法二：打包安装 .vsix

```bash
npm install -g @vscode/vsce    # 全局安装 vsce
vsce package                     # 打包 → 生成 codertreasure-x.x.x.vsix
code --install-extension codertreasure-x.x.x.vsix  # 安装
```

#### 方法三：一键编译

```bash
npm run compile    # 编译 TypeScript + 复制 game.html 到 dist/
```

> **注意：** `connor412.esbuild-problem-matchers` 是开发辅助工具，只在开发时帮助显示构建错误。**用户不需要安装它。**

---

## ⚠️ 常见问题 / FAQ

**Q: 为什么我的 F5 按了没反应？**
A: 检查以下几点：
1. 确保你用 VS Code 打开了 `codertreasure` 项目文件夹本身（不是子目录）
2. 已执行 `npm install`
3. 查看 Output 面板选择 "Extension Host" 有没有报错

**Q: 游戏面板打开了但代码是空白的？**
A: 可能原因：
1. 构建没有成功 — 先跑一次 `npm run compile`
2. `game.html` 中有 JavaScript 语法错误 — 查看 Debug Console

**Q: 可以在其他 IDE（WebStorm / IDEA / Cursor / Trae）上用吗？**
A: 这些 IDE 都基于 VS Code 内核，支持 `.vsix` 安装方式。扩展面板 → `...` → Install from VSIX 即可安装。

**Q: 如何添加新的关卡？**
A: 编辑 `src/game.html`，找到 `LEVELS = [` 数组追加新关卡对象即可。

**Q: 状态栏上有些按钮点了没反应？**
A: 这是故意的！大部分元素是装饰用的，只有语言标签（Vue/Java/TS）、🔍 提示按钮、↻ 重置按钮可以交互。

---

## Changelog / 变更记录

### v2.6.0 (2026-07-17) — 市场发布 & 协议更新
- ✅ 正式发布到 VS Code Marketplace
- ✅ LICENSE 从 MIT 更换为 **GPL-3.0-or-later**（非商用免费 / 商用需授权）
- ✅ 新增 CONTRIBUTING.md 贡献指南
- ✅ package.json 优化：双语描述、keywords、Visualization 分类
- ✅ 图标重新设计（代码编辑器 + 金色宝石主题）

### v2.5.0 (2026-07-17) — 体验优化 & 文档完善
- ✅ 状态栏交互优化（区分可点击和装饰元素 + tooltip）
- ✅ 代码显示优化（滚动条、字体渲染、行高亮、hover 效果）
- ✅ 完整文档（项目结构、环境要求、测试指南、用户指南、FAQ）

### v2.4.0 (2026-07-16) — 多关卡系统 + Java/TS 支持
- ✅ 3 个初始关卡：Vue SFC / Java Spring Boot / TypeScript
- ✅ 关卡切换：状态栏语言标签或 Ctrl+L

### v2.3.0 ~ v2.1.0 — 语法高亮 & UI 优化
- ✅ VS Code Dark+ 级语法高亮引擎
- ✅ 移除套娃层（title-bar/activity-bar/sidebar）
- ✅ 游戏控件伪装成 VS Code 原生元素

### v1.5.0 (2026-07-16) — 重大重构
- ✅ 从网格连连看改为代码编辑器伪装配对游戏

详见 [CHANGELOG.md](CHANGELOG.md)

---

## 🤝 Contributing / 贡献指南

欢迎参与 CoderTreasure 的开发！

- 🐛 **报告 Bug** → [GitHub Issues](https://github.com/qinhan5667/codertreasure/issues)
- 💡 **提出创意** → 创建带 `[idea]` 标签的 Issue
- 🎮 **添加新关卡** → 最受欢迎的贡献方向！Python / Go / Rust 关卡等你来写
- 🔧 **提交代码** → Fork → Branch → PR

详细的贡献流程、代码规范、如何添加新关卡，请阅读 **[CONTRIBUTING.md](CONTRIBUTING.md)**。

---

## License / 许可证

**GPL-3.0-or-later** (GNU General Public License v3.0 或更高版本)

- ✅ **个人/非商用**：免费使用、学习、修改、分发
- ✅ **开源贡献**：欢迎在 GitHub 上提交 PR 和 Issue
- ⚠️ **商业使用**：需获得单独的商业授权，请联系作者

详见 [LICENSE.md](LICENSE.md) | [在线查看协议](https://github.com/qinhan5667/codertreasure?tab=MIT-1-ov-file)
