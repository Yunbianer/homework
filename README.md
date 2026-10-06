# 校园学习空间整合平台

一个面向校园场景的前端整合实践项目，将「自习室查询 · 学习数据统计 · 三维校园导览」整合到统一入口，覆盖页面、样式、交互、数据可视化与三维（进阶）五类模块。

## 功能模块

| 模块 | 说明 | 关键文件 |
|---|---|---|
| 🏠 首页 | 统一入口与导航，三张模块卡片直达各功能区 | `index.html` |
| 🪑 自习室 | 按楼层 / 开放状态实时筛选自习室，卡片展示剩余座位与占用进度条 | `js/studyroom.js` |
| 📊 统计 | 加载 `data.json`，用 ECharts 渲染各自习室使用量柱状图（标题、单位、数据来源齐全） | `js/stats.js`、`data.json` |
| 🏫 校园三维 | 基于 A-Frame 的交互式三维校园场景（教学楼、旗杆、路灯），可旋转缩放，含返回首页 | `three-d/scene.html` |

## 技术栈与资源来源

| 资源 | 用途 | 来源 |
|---|---|---|
| HTML5 + CSS3 + 原生 JavaScript | 页面结构、样式、交互逻辑 | 项目内 `index.html` / `css/` / `js/` |
| Bootstrap 5.3.3 | 响应式布局与 UI 组件 | CDN：`https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/` |
| ECharts 5.5.0 | 统计柱状图渲染 | CDN：`https://cdn.jsdelivr.net/npm/echarts@5.5.0/` |
| A-Frame | 三维场景（WebGL） | 项目内本地库 `three-d/libs/aframe.min.js` |
| 示例数据 | 自习室使用量 | 项目内 `data.json`（手写示例数据） |

> 说明：Bootstrap 与 ECharts 通过 CDN 加载，需联网；A-Frame 为本地库，断网时三维场景仍可渲染。

## 目录结构

```
integration/
├── index.html              # 首页（统一入口与导航）
├── data.json               # 统计模块示例数据
├── css/
│   └── style.css           # 自定义样式
├── js/
│   ├── studyroom.js        # 自习室筛选逻辑
│   └── stats.js            # 统计图表逻辑
├── three-d/
│   ├── scene.html          # 三维校园场景页
│   └── libs/
│       └── aframe.min.js   # A-Frame 本地库
└── serve.ps1               # 可选：PowerShell 本地静态服务器
```

> 注：仓库中 `android/`、`ios/`、`lib/`、`pubspec.yaml` 等为历史遗留的 Flutter 工程文件，与本项目无关，可忽略。

## 运行方式

⚠️ **必须通过本地 HTTP 服务器访问**，不能直接双击 `index.html`。
原因：统计模块用 `fetch('data.json')` 加载数据，浏览器在 `file://` 协议下会因 CORS 拦截导致加载失败（页面会显示「请通过本地服务器访问」的断网提示，属预期行为）。

### 方式一：项目自带 serve.ps1（无需 Python/Node）

在项目目录打开 PowerShell，运行：
```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```
看到 `Serving at http://localhost:8000/` 后，浏览器访问：
```
http://localhost:8000/
```

### 方式二：Python（需已安装 Python）

```powershell
cd c:\Users\18163\integration
python -m http.server 8000
```
浏览器访问 `http://localhost:8000/`。

### 方式三：VS Code Live Server 扩展

安装 Live Server 后，右键 `index.html` →「Open with Live Server」。

## 自查要点（质量清单）

- **三档宽度**：用 Chrome 设备工具栏（F12 → Ctrl+Shift+M）分别在 1920 / 1280 / 375 宽度下验证响应式布局。
- **断网提示**：`file://` 打开或 `data.json` 缺失时，统计区应显示红色友好提示，而非页面崩溃。
- **空数据**：自习室无匹配结果时应显示「没有符合条件的自习室」提示。
- **Console**：通过本地服务器访问时，F12 Console 应无红色报错。

## Git 提交记录

| 提交 | 说明 |
|---|---|
| `60b805f` | 搭建整合骨架：入口与首页 |
| `298660a` | 交互与图表模块：自习室筛选 + 使用量柱状图 |
| `f493d3d` | 三维区与自查证据 |

远程仓库：`https://github.com/Yunbianer/homework.git`（master 分支）
