# Contributing to CoderTreasure / 贡献指南

感谢你对 CoderTreasure 的兴趣！无论是修复 Bug、添加新关卡、优化语法高亮、还是提出创意——所有贡献都很欢迎。

## Quick Start / 快速开始

```bash
git clone https://github.com/qinhan5667/codertreasure.git
cd codertreasure
npm install
npm run compile      # 编译项目
# 按 F5 在 VS Code 中启动调试
```

详细开发步骤见 [README.md](README.md) 的「如何测试」章节。

## How to Contribute / 怎么贡献

### 报告 Bug / Report Bugs

1. 去 [GitHub Issues](https://github.com/qinhan5667/codertreasure/issues) 创建新 Issue
2. 描述问题：你做了什么操作、期望什么结果、实际发生了什么
3. 附上 VS Code 版本、操作系统、插件版本等信息

### 提出新创意 / Suggest Ideas

- 在 Issues 中创建一个带 `[idea]` 标签的 Issue
- 描述你想实现的功能或体验改进
- 说明它如何提升玩家的体验

### 提交代码 / Submit Code

1. **从 main 创建新分支**（不要直接在 main 上开发）
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **开发 & 测试**
   - 修改代码后用 F5 调试验证
   - 确保没有引入新 Bug

3. **提交消息规范 / Conventional Commits**
   ```
   feat: 添加 Python 关卡
   fix: 修复 Java 语法高亮颜色错误
   docs: 更新 README 截图
   refactor: 重构关卡切换逻辑
   style: 调整代码区字体渲染
   ```

4. **提交 PR**
   - PR 目标分支是 `main`
   - 在 PR 描述中说明做了什么、为什么做、如何测试
   - 如果修改了 `game.html`，请截图展示效果变化

## What You Can Work On / 可参与的方向

| 方向 | 需要修改的文件 | 说明 |
|------|--------------|------|
| **添加新关卡** | `src/game.html` → `LEVELS[]` 数组 | 最受欢迎的贡献！添加 Python、Go、Rust 等关卡 |
| **优化语法高亮** | `src/game.html` → `dispatchHighlight()` | 让代码颜色更接近 VS Code Dark+ |
| **新游戏机制** | `src/game.html` | 限时模式、难度选择、得分排行榜 |
| **VS Code 集成** | `src/extension.ts` | 新命令、设置项、侧边栏面板 |
| **文档改进** | `README.md`, `design/GDD.md` | 补充说明、修正错误、翻译 |
| **构建优化** | `esbuild.js`, `package.json` | 减小包体积、加速编译 |

## Adding a New Level / 添加新关卡

这是最常见的贡献方式。步骤：

1. 找一段真实的代码文件（约 30-60 行）
2. 在代码中标记 6-10 个关键字，每个关键字在原始代码中只出现 1 次
3. 构造 `pairs` 数组：每个 pair 是 `[原文位置, 注入位置]`
4. 构造 `injections` 数组：每个 injection 在指定行号插入重复的关键字
5. 编写对应的语法高亮函数（`highlightPython` / `highlightGo` 等）

```javascript
// 在 LEVELS 数组中追加：
{
  name: "Level 4: Python Data Processing",
  lang: "Python",
  langMode: "python",
  breadcrumb: "src / utils / data_processor.py",
  code: `你的 Python 代码...`,
  pairs: [
    { keyword: "DataFrame", original: [3], injected: [18] },
    { keyword: "read_csv", original: [5], injected: [22] },
    // ...
  ],
  injections: [
    { line: 18, keyword: "DataFrame", afterText: " = " },
    { line: 22, keyword: "read_csv", afterText: "(" },
    // ...
  ]
}
```

## Code Style / 代码风格

- `src/game.html`：纯 HTML + CSS + JS，无框架依赖，保持单文件架构
- `src/extension.ts`：TypeScript，遵循项目 tsconfig 配置
- ESLint 检查：提交前运行 `npm run lint` 确保通过

## License Note / 许可证说明

本项目采用 **GPL-3.0-or-later** 协议。提交 PR 即表示你同意你的贡献也将在 GPL-3.0 下授权。

如你对许可证有疑问，请在 PR 中注明，我们会单独沟通。

---

**Have fun contributing — and remember, the best contributions make the game more fun to play!**
