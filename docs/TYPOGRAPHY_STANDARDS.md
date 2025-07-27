# 文本大小标准规范

## 概述

本文档定义了前端项目中统一的文本大小标准，遵循 Mobile-First 设计原则。所有文本大小均使用 Tailwind CSS 类名。

## 设计原则

- **Mobile-First**: 无前缀类名为移动端设计，仅使用 `md:` 前缀适配桌面端
- **语义化**: 根据内容的重要性和层级确定字体大小
- **一致性**: 相同类型的内容使用相同的文本大小
- **可访问性**: 确保文本在所有设备上清晰可读

## 文本大小层级体系

### 1. 页面级标题 (Page Level Headers)

#### 主标题 (Hero Title)

- **移动端**: `text-4xl` (36px)
- **桌面端**: `md:text-6xl` (60px)
- **用途**: 首页主标题、Landing 页面核心标题
- **示例**: "Create Your Music", "Welcome to Galileo"

#### 页面标题 (Page Title)

- **移动端**: `text-3xl` (30px)
- **桌面端**: `md:text-4xl` (36px)
- **用途**: 各页面主标题
- **示例**: "Create Your Music", "Pricing Plans"

#### 页面副标题 (Page Subtitle)

- **移动端**: `text-lg` (18px)
- **桌面端**: `md:text-xl` (20px)
- **用途**: 页面标题下的描述文字
- **示例**: "Tell us what you have in mind and we'll compose it for you ✨"

### 2. 区块级标题 (Section Headers)

#### 区块标题 (Section Title)

- **移动端**: `text-xl` (20px)
- **桌面端**: `md:text-2xl` (24px)
- **用途**: 页面内主要区块的标题
- **示例**: "Coming Soon", "Advanced Features"

#### 子区块标题 (Subsection Title)

- **移动端**: `text-lg` (18px)
- **桌面端**: `md:text-xl` (20px)
- **用途**: 区块内的小标题
- **示例**: "🎯 Choose your scenario", "🏷️ Add keywords"

#### 卡片标题 (Card Title)

- **统一**: `text-2xl` (24px)
- **用途**: 功能卡片、内容卡片的标题
- **示例**: "Music Editor", "Video Soundtrack"

### 3. 正文内容 (Body Content)

#### 标准正文 (Body Text)

- **统一**: `text-base` (16px)
- **用途**: 主要内容文字、段落文本
- **示例**: 文章内容、描述文字

#### 重要正文 (Emphasized Body)

- **移动端**: `text-lg` (18px)
- **桌面端**: `md:text-xl` (20px)
- **用途**: 需要突出的正文内容
- **示例**: 重要说明、亮点描述

### 4. 界面元素 (UI Elements)

#### 主要按钮 (Primary Button)

- **移动端**: `text-lg` (18px)
- **桌面端**: `md:text-xl` (20px)
- **用途**: 主要操作按钮
- **示例**: "🎵 Generate Now", "Get Started"

#### 次要按钮 (Secondary Button)

- **统一**: `text-base` (16px)
- **用途**: 次要操作按钮、工具按钮
- **示例**: "Shuffle", "Clear selection"

#### 小按钮/标签 (Small Button/Tag)

- **统一**: `text-sm` (14px)
- **用途**: 标签按钮、选择器、chip
- **示例**: scenario 按钮、keyword 标签

#### 导航菜单 (Navigation)

- **统一**: `text-base` (16px)
- **用途**: 主导航、菜单项
- **示例**: 顶部导航链接

#### 表单输入框 (Form Inputs)

**主要输入框 (Primary Input)**
- **移动端**: `text-lg` (18px)
- **桌面端**: `md:text-xl` (20px)
- **用途**: 重要的主要输入区域
- **示例**: Create页面的音乐描述输入框

**标准输入框 (Standard Input)**
- **统一**: `text-base` (16px)
- **用途**: 一般表单输入框
- **示例**: 登录表单、设置页面输入框

### 5. 辅助信息 (Supporting Information)

#### 标签文字 (Label Text)

- **统一**: `text-sm` (14px)
- **用途**: 表单标签、字段说明
- **示例**: "Email", "Password"

#### 提示文字 (Helper Text)

- **统一**: `text-sm` (14px)
- **用途**: 帮助说明、提示信息
- **示例**: placeholder 文字、错误提示

#### 细节信息 (Fine Print)

- **统一**: `text-xs` (12px)
- **用途**: 版权信息、免责声明、徽章
- **示例**: "© 2024 Galileo", 状态徽章

### 6. 特殊用途 (Special Cases)

#### 图标文字 (Icon Text)

- **统一**: `text-5xl` (48px)
- **用途**: 大型装饰图标、emoji 图标
- **示例**: 功能卡片中的 emoji

#### 数字显示 (Numeric Display)

- **移动端**: `text-2xl` (24px)
- **桌面端**: `md:text-3xl` (30px)
- **用途**: 价格、统计数字、重要数值
- **示例**: "$29/month", "100+ tracks"

## 使用示例

### 正确示例

```tsx
// 页面标题
<h1 className="text-3xl md:text-4xl font-bold">Create Your Music</h1>

// 页面副标题
<p className="text-lg md:text-xl text-muted-foreground">
  Tell us what you have in mind and we'll compose it for you ✨
</p>

// 区块标题
<h2 className="text-xl md:text-2xl font-semibold">Coming Soon</h2>

// 主要按钮
<Button className="text-lg md:text-xl">🎵 Generate Now</Button>

// 标签按钮
<Button className="text-sm">Work</Button>

// 卡片标题
<h3 className="text-2xl font-bold">Music Editor</h3>

// 主要输入框
<Textarea className="text-lg md:text-xl">Describe your music...</Textarea>

// 标准输入框
<Input className="text-base" placeholder="Enter your email" />
```

### 错误示例

```tsx
// ❌ 不一致的页面标题大小
<h1 className="text-2xl">Create Your Music</h1>  // 太小
<h1 className="text-5xl">Pricing Plans</h1>      // 太大

// ❌ 按钮文字大小不当
<Button className="text-xs">Generate Now</Button>  // 主要按钮太小
<Button className="text-xl">Shuffle</Button>       // 次要按钮太大

// ❌ 使用了非标准断点
<h1 className="text-lg sm:text-xl lg:text-2xl">Title</h1>  // 不应使用sm:和lg:
```

## 检查清单

在代码审查时，请检查以下项目：

- [ ] 页面标题使用 `text-3xl md:text-4xl`
- [ ] 页面副标题使用 `text-lg md:text-xl`
- [ ] 区块标题使用 `text-xl md:text-2xl`
- [ ] 卡片标题使用 `text-2xl`
- [ ] 主要按钮使用 `text-lg md:text-xl`
- [ ] 次要按钮使用 `text-base`
- [ ] 标签按钮使用 `text-sm`
- [ ] 正文内容使用 `text-base`
- [ ] 标签文字使用 `text-sm`
- [ ] 细节信息使用 `text-xs`
- [ ] 主要输入框使用 `text-lg md:text-xl`
- [ ] 标准输入框使用 `text-base`
- [ ] 只使用 `md:` 断点，避免 `sm:`, `lg:`, `xl:` 等
- [ ] 相同类型的内容使用相同的文本大小

## 维护说明

1. **定期检查**: 建议每月检查一次整个 codebase 的文本大小使用情况
2. **新功能**: 开发新功能时严格按照此标准执行
3. **重构**: 逐步将现有代码调整为符合标准
4. **文档更新**: 如需调整标准，请先更新此文档

## 工具支持

可以使用以下命令搜索不符合标准的文本大小使用：

```bash
# 搜索使用了非标准断点的文件
grep -r "text-.*sm:" src/
grep -r "text-.*lg:" src/
grep -r "text-.*xl:" src/

# 搜索可能不符合标准的文本大小
grep -r "text-[0-9]xl" src/
```

---

**版本**: 1.0
