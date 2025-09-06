# 个人学术主页

这是一个现代化的个人学术主页，使用纯HTML、CSS和JavaScript构建，适合部署到GitHub Pages。

## 功能特点

- 📱 完全响应式设计，适配所有设备
- 🎨 现代化UI设计，美观大方
- ⚡ 快速加载，性能优化
- 🔍 SEO友好
- 📧 完整的联系信息展示
- 📚 论文和项目展示
- ✨ 平滑滚动和动画效果

## 包含部分

1. **首页** - 个人简介和主要信息
2. **关于我** - 详细个人介绍和统计数据
3. **研究兴趣** - 研究领域和兴趣展示
4. **发表论文** - 学术论文列表
5. **项目展示** - 研究项目和代码展示
6. **联系我** - 联系方式和社交媒体链接

## 使用方法

1. 克隆或下载此项目
2. 修改 `index.html` 中的个人信息：
   - 姓名、职位、简介
   - 照片链接
   - 联系信息
   - 论文列表
   - 项目信息
3. 上传到GitHub仓库
4. 在仓库设置中启用GitHub Pages
5. 选择主分支作为发布源

## 自定义指南

### 修改个人信息
在 `index.html` 中找到以下部分并修改：
- 页面标题和导航栏中的姓名
- 首页的个人介绍
- 关于我部分的详细描述
- 联系信息

### 添加论文
在发表论文部分添加新的论文条目：
```html
<div class="publication-item">
    <div class="publication-year">年份</div>
    <div class="publication-content">
        <h3>论文标题</h3>
        <p class="publication-authors">作者列表</p>
        <p class="publication-venue">发表期刊/会议</p>
        <div class="publication-links">
            <a href="#" class="publication-link"><i class="fas fa-file-pdf"></i> PDF</a>
            <a href="#" class="publication-link"><i class="fas fa-code"></i> Code</a>
        </div>
    </div>
</div>
```

### 添加项目
在项目展示部分添加新项目：
```html
<div class="project-card">
    <div class="project-image">
        <img src="项目图片链接" alt="项目名称">
    </div>
    <div class="project-content">
        <h3>项目名称</h3>
        <p>项目描述</p>
        <div class="project-tech">
            <span class="tech-tag">技术标签</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i> 查看项目</a>
            <a href="#" class="project-link"><i class="fab fa-github"></i> GitHub</a>
        </div>
    </div>
</div>
```

### 修改颜色主题
在 `style.css` 中修改CSS变量来改变主题颜色：
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #6366f1;
    --text-color: #333;
    --bg-color: #f8fafc;
}
```

## 部署到GitHub Pages

1. 创建新的GitHub仓库
2. 上传所有文件到仓库
3. 进入仓库设置 → Pages
4. 选择 "Deploy from a branch"
5. 选择 "main" 分支和 "/ (root)" 文件夹
6. 点击保存，等待部署完成

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License - 可自由使用和修改

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, 动画)
- JavaScript (ES6+)
- Font Awesome 图标
- Google Fonts

## 特色功能

### 动画效果
- 页面加载动画
- 滚动触发动画
- 悬停效果
- 打字机效果
- 数字计数动画

### 交互功能
- 平滑滚动导航
- 移动端响应式菜单
- 滚动进度条
- 返回顶部按钮
- 导航栏滚动效果

### 响应式设计
- 移动端优先设计
- 平板和桌面端适配
- 灵活的网格布局
- 自适应图片和文字

## 快速开始

1. **下载项目文件**
   ```bash
   git clone [你的仓库地址]
   cd homepage
   ```

2. **修改个人信息**
   - 编辑 `index.html` 中的个人信息
   - 替换占位图片链接
   - 更新联系信息

3. **本地预览**
   - 直接在浏览器中打开 `index.html`
   - 或使用本地服务器：
   ```bash
   python -m http.server 8000
   # 然后访问 http://localhost:8000
   ```

4. **部署到GitHub Pages**
   - 推送代码到GitHub仓库
   - 在仓库设置中启用Pages
   - 等待部署完成

## 常见问题

### Q: 如何更换个人照片？
A: 将你的照片上传到GitHub仓库或使用在线图片服务，然后修改 `index.html` 中的图片链接。

### Q: 如何添加更多论文？
A: 在 `index.html` 的发表论文部分复制现有的论文条目，修改内容即可。

### Q: 如何修改网站颜色？
A: 在 `style.css` 文件中搜索颜色值（如 `#4f46e5`），替换为你喜欢的颜色。

### Q: 如何添加新的研究兴趣？
A: 在 `index.html` 的研究兴趣部分复制现有的卡片，修改图标和内容。

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 完整的响应式设计
- 基础动画效果
- 论文和项目展示功能
