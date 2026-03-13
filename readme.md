# VVenve

VVenve 是一个**通用的** Scratch 平台安全审计工具。

**QQ群**：1059188026

## 功能特性

### 🔍 实时变量监视

- 监视任意角色的变量和列表
- 实时显示变量值的变化
- 支持锁定变量，防止被脚本修改
- 可视化变量监视器界面

### 📦 项目资源导出

- 一键下载整个 Scratch 项目（.sb3 格式）
- 导出舞台资源（.sprite3 格式）
- 批量导出所有角色资源
- 便于项目备份和资源提取

### 🎯 角色管理

- 显示所有角色（包括克隆体）
- 查看每个角色的变量
- 快速访问角色信息

### 🛠️ 开发者工具

- 访问 Scratch VM 实例
- 打印 VM 到控制台进行调试

### 💎 数据安全

- 提供接口供作品获取玩家是否使用了VVenve
- 作品可自定义是否要 **启/禁用** VVenve的使用

## 技术栈

- **nine-9** - 轻量级响应式 UI 框架
- **TypeScript** - 类型安全
- **Scratch VM** - Scratch 虚拟机 API
- **Scratch Obtain** - 获取 ScratchVM

## 安装

```bash
# 克隆项目
git clone https://github.com/Rundll86/VVenve.git

# 安装依赖
pnpm install
```

## 使用方法

### 开发模式

需要同时在两个目录运行开发服务器：

1. 首先在 nine-9 子模块目录启动开发模式：

    ```bash
    cd src/nine
    pnpm dev
    ```

2. 然后在 scratch-obtain 子模块目录启动开发模式

    ```bash
    cd src/scratch-obtain
    pnpm dev
    ```

3. 然后在根目录启动 VVenve 开发模式：

    ```bash
    pnpm dev:watch
    ```

4. 亦或者，使用带有 HMR 的 Playwright 服务器：

    ```bash
    pnpm dev
    ```

### 构建

需要按顺序构建：

1. 首先构建 nine-9 子模块：

    ```bash
    cd src/nine
    pnpm build
    cd ../..
    ```

2. 然后构建 scratch-obtain 子模块：

    ```bash
    cd src/scratch-obtain
    pnpm build
    cd ../..
    ```

3. 然后构建 VVenve：

    ```bash
    pnpm build
    ```

### 类型检查

```bash
pnpm lint:type
```

### 代码检查

```bash
pnpm lint:es
```

## 项目结构

```plain
src/
├── api/
│   └── vm.ts              # Scratch VM 封装和 API
│   └── context.ts         # 注入上下文 API
├── components/
│   ├── windows/           # 窗口组件
│   │   ├── MainWindow.ts      # 主窗口
│   │   ├── ProjectWindow.ts    # 项目管理器
│   │   └── WatcherWindow.ts    # 变量监视器
│   ├── target/
│   │   ├── SpriteTarget.ts     # 角色显示组件
│   │   └── VariableTarget.ts   # 变量显示组件
│   └── ...                # 其他 UI 组件
├── state/
│   ├── vm.ts              # VM 状态管理
│   └── window.ts          # 窗口状态管理
├── nine/                  # nine-9 框架源码
├── scratch-obtain/        # scratch-obtain 库源码
└── index.ts               # 入口文件
```

## 核心功能说明

### 变量监视

1. 点击角色旁边的变量，添加到监视列表
2. 在"变量视奸器"窗口中实时查看变量值
3. 点击变量可以锁定/解锁变量
4. 锁定的变量将无法被脚本修改

### 项目导出

1. 在主窗口点击"项目管理器"
2. 选择要导出的内容：
   - 下载作品到本地（.sb3）
   - 下载舞台（.sprite3）
   - 下载所有角色（.sprite3）

### 开发者调试

1. 点击 `打印到控制台` 查看 VM 实例
2. 通过 `window.__VVENVE__` 获取注入上下文

## nine-9 框架

本项目集成了 nine-9 框架，一个轻量级、高性能的响应式 UI 框架。

### 特性

- 响应式数据绑定
- 差量更新，性能优异
- 完整的 TypeScript 支持
- Vue 风格的指令系统
- React Hooks 风格的 API

更多详情请查看 [nine-9 文档](src/nine/README.md)

## scratch-obtain 库

本项目集成了 scratch-obtain 运行时库，通过各种稀奇古怪的方式获取 VM 实例。

###

- 配置不同获取 VM 的方式
- 通过优先级指定适合项目的方式获取VM

## 依赖项

- `@turbowarp/types` - Scratch VM 类型定义
- `tsup` - 打包工具

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 致谢

- [Scratch](https://scratch.mit.edu/) - 创意编程平台
- [TurboWarp](https://turbowarp.org/) - 改进的 Scratch 编辑器
- nine-9 框架 - 响应式 UI 框架
- scratch-obtain - 获取 ScratchVM

---

> Readme written by GPT-4o
