# sgs.mho666.com 参考网站完整爬取

> 来源: http://sgs.mho666.com/
> 技术栈: Vue 2 + Vuex + Vue Router + Element UI + Canvas 2D

## 文件清单

```
reference-site/
├── index.html                          # 主页面
├── favicon.ico / favicon.svg           # 网站图标
│
├── static/css/
│   └── app.css                         # 全局样式 (245KB)
│
├── static/js/
│   ├── manifest.js                     # Webpack manifest
│   ├── vendor.js                       # 第三方库 (Vue/Vuex/ElementUI/Axios等)
│   ├── app.js                          # 主应用代码 (Store/路由/API配置)
│   ├── 0.chunk.js                      # 懒加载chunk (武将列表页)
│   ├── 1.chunk.js                      # 懒加载chunk (编辑器主页)
│   ├── app.pretty.js                   # 美化版 (可读)
│   ├── vendor.pretty.js                # 美化版 (可读)
│   ├── chunk0.pretty.js                # 美化版 (可读)
│   └── chunk1.pretty.js                # 美化版 (可读)
│
├── static/font/woff2/                  # 卡牌字体
│   ├── FangZhengZhunYuan.woff2         # 方正准圆 (技能描述, 1.1MB)
│   ├── jmmcsgsfix.woff2                # 金梅茅草行书 (武将名, 2.7MB)
│   ├── xinzhuantizi.woff2              # 新篆体 (称号, 3.1MB)
│   └── FangZhengLiShuJianTi.woff2      # 方正隶书简体 (技能名, 6.7MB)
│
├── static/fonts/                       # UI图标字体
│   ├── element-icons.woff              # Element UI 图标
│   └── element-icons.ttf
│
└── static/img/
    ├── 2022/                           # 势力精灵图 (核心素材)
    │   ├── wei.png / wei_zhu.png       # 魏势力边框 (普通/主公)
    │   ├── shu.png / shu_zhu.png       # 蜀势力边框
    │   ├── wu.png / wu_zhu.png         # 吴势力边框
    │   ├── qun.png / qun_zhu.png       # 群势力边框
    │   ├── shen.png                    # 神势力边框
    │   └── jin.png / jin_zhu.png       # 晋势力边框
    ├── bg2.png                         # 卡牌背景图
    ├── alert_bg.png                    # 弹窗背景
    ├── huan12.png                      # "欢"Logo水印
    ├── logo_biao.png                   # "标"Logo水印
    ├── guohuanghou.jpg                 # 示例武将图片
    ├── copy_excel_demo2.png            # 导入示例图
    ├── weixin_pay_small.jpg            # 微信支付码
    └── baoquan.gif                     # 动画素材
```

## 核心代码模块说明

### app.js — 主应用
- **Vuex Store**: `app`模块(卡牌状态/势力配置/DIY设置) + `user`模块(用户认证)
- **API配置**: 16个后端接口定义
- **工具函数**: ID生成、繁简转换、对象合并等

### chunk1.js — 编辑器主页 (核心)
- **Canvas渲染**: 画布初始化、体力条绘制、称号/武将名绘制、技能区绘制
- **精灵图加载**: 按势力名加载对应精灵图
- **技能文字**: 自动换行、关键词加粗、字号自适应、两遍渲染
- **数据导入**: Tab分隔文本批量导入武将

### chunk0.js — 武将列表页
- 武将列表展示、搜索、筛选
- 批量管理(增删改)

## 势力精灵图说明

每张精灵图包含该势力的所有UI元素:
- 血珠图标 (满血/空血)
- 技能名框 (普通/追加)
- 技能描述背景
- 花色符号 (♠♥♣♦)
- 势力标记

坐标体系: Y轴按势力分行(每100px), X轴按元素类型分列

## 字体用途

| 字体 | 用途 |
|------|------|
| 方正准圆 | 技能描述文字 |
| 方正隶书简体 | 技能名称 |
| 金梅茅草行书 | 武将名 |
| 新篆体 | 称号 |
