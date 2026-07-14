# Global Kill Card Editor — 开发方案与步骤

> 基于 SDS（软件开发规范）、EBS（编辑器行为规范）、UIS（UI 规范）制定

---

## 一、技术选型

| 维度 | 方案 |
|------|------|
| 框架 | React 18 + TypeScript（严格模式） |
| 构建工具 | Vite |
| 状态管理 | Zustand |
| 画布渲染 | Fabric.js |
| UI 组件 | 自研轻量组件 |
| 数据存储 | IndexedDB（localforage） |
| 导出引擎 | Canvas toBlob API |

---

## 二、系统架构

```
┌─────────────────────────────────────────────┐
│  UI Layer                                   │
│  顶部工具栏 / 左侧面板 / 画布 / 右侧面板 / 状态栏  │
├─────────────────────────────────────────────┤
│  Editor Core                                │
│  画布渲染引擎 + 对象管理 + 属性面板                │
├─────────────────────────────────────────────┤
│  Business Layer                             │
│  ├─ Workspace Manager                       │
│  ├─ Project Manager                         │
│  ├─ Template Manager                        │
│  ├─ Asset Manager                           │
│  ├─ Layer Manager                           │
│  ├─ Export Engine                           │
│  └─ Persistence（本地存储）                   │
├─────────────────────────────────────────────┤
│  Data Model（Project / Card / Layer）       │
└─────────────────────────────────────────────┘
```

---

## 三、开发阶段

### Phase 1：Workspace & Project 基础框架
- 初始化 Vite + React + TS 项目
- 配置 TS 严格模式与目录结构
- 实现 Workspace Manager
- 实现 Project Manager（创建/打开/删除项目）
- 搭建 Persistence 层（IndexedDB）
- 设计数据模型（Project / Card / Layer）
- 搭建整体 UI 框架（三栏布局）

### Phase 2：模板系统与素材管理
- Template Manager（上传/更新/删除/分类）
- Asset Manager（图片上传/删除/重命名/搜索）
- 左侧资源区四个 Tab
- 拖拽图片到画布

### Phase 3：画布与图层系统
- 集成 Fabric.js 画布引擎
- 固定尺寸画布 + 缩放/拖拽
- 对象列表（显示/隐藏/锁定/排序）
- 四种编辑器状态

### Phase 4：图片与文字编辑
- 图片对象：添加/替换/移动/缩放/旋转/透明度
- 文字对象：内容/字体/字号/颜色/对齐等
- 属性面板动态切换

### Phase 5：保存与恢复
- Undo/Redo 系统（命令模式，100步）
- 自动保存机制
- 卡牌完整状态保存与恢复

### Phase 6：PNG 导出与缩略图
- 高清 PNG 导出
- 自动生成缩略图
- 项目首页展示

### Phase 7：测试、优化与发布
- 单元测试 + 集成测试
- 性能优化
- 异常处理
- 文档与示例

---

## 四、核心数据模型

```typescript
interface Layer {
  id: string;
  name: string;
  type: 'image' | 'text';
  visible: boolean;
  locked: boolean;
  x: number; y: number;
  width: number; height: number;
  rotation: number;
  opacity: number;
  // image
  imageUrl?: string;
  // text
  text?: string;
  font?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  align?: string;
  lineHeight?: number;
  letterSpacing?: number;
}

interface Card {
  id: string;
  name: string;
  canvasWidth: number;
  canvasHeight: number;
  layers: Layer[];
  createdAt: number;
  updatedAt: number;
}

interface Project {
  id: string;
  name: string;
  cards: Card[];
  assets: Asset[];
  createdAt: number;
  updatedAt: number;
}
```

---

## 五、目录结构

```
src/
├── components/        # UI 组件
├── core/              # 编辑器核心（画布引擎）
├── managers/          # 业务管理器
├── models/            # 数据模型与类型
├── stores/            # Zustand 状态管理
├── utils/             # 工具函数
├── hooks/             # 自定义 Hooks
├── styles/            # 全局样式
└── App.tsx
```

---

## 六、Workspace 目录结构

```
Workspace/
├── Projects/
├── Templates/
├── Assets/
├── Exports/
└── Trash/
```

---

## 七、注意事项

1. 采用 TypeScript 严格模式
2. 模块职责单一，低耦合
3. 所有资源通过统一管理器访问
4. 优先考虑后续服务器部署扩展
5. 保持界面简洁，操作路径控制在两步以内
