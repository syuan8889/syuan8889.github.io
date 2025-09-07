# 主题颜色自定义指南

## 🎨 如何自定义主题颜色

### 1. 修改白天主题颜色

在 `style.css` 文件的 `:root` 部分修改以下变量：

```css
:root {
    /* 白天主题 */
    --bg-primary: #ffffff;        /* 主背景色 */
    --bg-secondary: #f8fafc;      /* 次要背景色 */
    --text-primary: #333333;      /* 主要文字颜色 */
    --text-secondary: #666666;    /* 次要文字颜色 */
    --text-muted: #888888;        /* 弱化文字颜色 */
    --accent-color: #4f46e5;      /* 强调色（按钮、链接等） */
    --accent-hover: #4338ca;      /* 强调色悬停状态 */
    --card-bg: #ffffff;           /* 卡片背景色 */
    --card-shadow: rgba(0, 0, 0, 0.1);  /* 卡片阴影 */
    --border-color: #e2e8f0;      /* 边框颜色 */
    --navbar-bg: rgba(255, 255, 255, 0.95);  /* 导航栏背景 */
    --hero-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  /* 首页渐变 */
}
```

### 2. 修改黑夜主题颜色

在 `style.css` 文件的 `[data-theme='dark']` 部分修改以下变量：

```css
[data-theme='dark'] {
    /* 黑夜主题 */
    --bg-primary: #1a1a1a;        /* 主背景色 */
    --bg-secondary: #2d2d2d;      /* 次要背景色 */
    --text-primary: #ffffff;      /* 主要文字颜色 */
    --text-secondary: #e0e0e0;    /* 次要文字颜色 */
    --text-muted: #a0a0a0;        /* 弱化文字颜色 */
    --accent-color: #6366f1;      /* 强调色 */
    --accent-hover: #5b5bd6;      /* 强调色悬停状态 */
    --card-bg: #2d2d2d;           /* 卡片背景色 */
    --card-shadow: rgba(0, 0, 0, 0.3);  /* 卡片阴影 */
    --border-color: #404040;      /* 边框颜色 */
    --navbar-bg: rgba(26, 26, 26, 0.95);  /* 导航栏背景 */
    --hero-gradient: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);  /* 首页渐变 */
}
```

## 🌈 颜色方案示例

### 蓝色主题
```css
:root {
    --accent-color: #3b82f6;
    --accent-hover: #2563eb;
    --hero-gradient: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}
```

### 绿色主题
```css
:root {
    --accent-color: #10b981;
    --accent-hover: #059669;
    --hero-gradient: linear-gradient(135deg, #10b981 0%, #047857 100%);
}
```

### 紫色主题
```css
:root {
    --accent-color: #8b5cf6;
    --accent-hover: #7c3aed;
    --hero-gradient: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
}
```

### 红色主题
```css
:root {
    --accent-color: #ef4444;
    --accent-hover: #dc2626;
    --hero-gradient: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
}
```

## 🎯 颜色变量说明

| 变量名 | 用途 | 影响元素 |
|--------|------|----------|
| `--bg-primary` | 主背景色 | 页面背景、导航栏 |
| `--bg-secondary` | 次要背景色 | 各个section的背景 |
| `--text-primary` | 主要文字颜色 | 标题、重要文字 |
| `--text-secondary` | 次要文字颜色 | 正文、描述文字 |
| `--text-muted` | 弱化文字颜色 | 辅助信息、时间等 |
| `--accent-color` | 强调色 | 按钮、链接、图标 |
| `--accent-hover` | 强调色悬停 | 按钮悬停状态 |
| `--card-bg` | 卡片背景色 | 所有卡片、统计项 |
| `--card-shadow` | 卡片阴影 | 所有卡片的阴影 |
| `--border-color` | 边框颜色 | 边框、分割线 |
| `--navbar-bg` | 导航栏背景 | 顶部导航栏 |
| `--hero-gradient` | 首页渐变 | 首页背景渐变 |

## 💡 自定义建议

1. **保持对比度**：确保文字和背景有足够的对比度，保证可读性
2. **统一色调**：选择相近的颜色作为强调色和悬停色
3. **测试两种主题**：修改后要测试白天和黑夜两种主题
4. **渐变搭配**：首页渐变应该与强调色协调

## 🔧 快速修改步骤

1. 打开 `style.css` 文件
2. 找到 `:root` 和 `[data-theme='dark']` 部分
3. 修改你想要的颜色值
4. 保存文件
5. 刷新浏览器查看效果
