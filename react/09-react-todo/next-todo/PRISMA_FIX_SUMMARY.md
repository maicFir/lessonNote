# Prisma 配置与故障排除指南

## 1. 问题总结

我们遇到了一系列关于 **Prisma Client 配置** 和 **版本兼容性**（具体是 Prisma v7.3.0 与 v5.x）的错误。

### ❌ 错误 1：找不到模块 (Module Not Found)
**错误信息：**
```
Error: Cannot find module '.prisma/client/default'
```
**原因：**
`node_modules` 中缺少实际的 Prisma Client 文件。这通常发生在全新安装后未运行 `npx prisma generate` 的情况下。

### ❌ 错误 2：无效的 `accelerateUrl`
**错误信息：**
```
Error validating `accelerateUrl`, the URL cannot be parsed, reason: Invalid URL
```
**原因：**
`src/lib/prisma.ts` 文件中包含了一个空的 `accelerateUrl` 配置：
```typescript
new PrismaClient({
  accelerateUrl: "" // ❌ 这导致了崩溃
})
```

### ❌ 错误 3：Prisma v7 重大变更 (Breaking Changes)
**错误信息：**
```
The datasource property `url` is no longer supported in schema files.
```
**原因：**
Prisma v7 引入了重大变更，要求将数据库连接 URL 移出 `schema.prisma`（移至 `prisma.config.ts` 或通过构造函数/适配器传递）。然而，必要的适配器（例如 `@prisma/adapter-mysql`）在当前环境中不可用或安装失败。

---

## 2. 解决方案：降级到稳定的 v5 版本

为了确保稳定性并兼容标准的连接方法，我们将 Prisma 从 **v7.3.0** 降级到了最新的稳定版 **v5.22.0**。

### ✅ 所做的更改

1.  **降级依赖包：**
    安装了 `5.22.0` 版本的 `prisma` 和 `@prisma/client`。
    ```bash
    pnpm add prisma@5.22.0 @prisma/client@5.22.0
    ```

2.  **恢复 `schema.prisma`：**
    将 `url` 属性添加回 `datasource` 块，这是 v5 版本配置连接的标准方式。
    ```prisma
    datasource db {
      provider = "mysql"
      url      = env("DATABASE_URL") // ✅ v5 版本支持
    }
    ```

3.  **清理 `src/lib/prisma.ts`：**
    将客户端初始化恢复为最简单的形式，移除了不兼容的配置。
    ```typescript
    export const prisma =
      globalForPrisma.prisma ||
      new PrismaClient({
        log: ['query'],
      });
    ```

4.  **删除配置文件：**
    删除了 `prisma.config.ts`，因为 Prisma v5 不需要它。

5.  **重新生成客户端：**
    运行生成命令以构建客户端文件。
    ```bash
    npx prisma generate
    ```

## 3. 如何启动服务器

由于 `node_modules` 和 Prisma Client 发生了变化，您**必须重启开发服务器**以使更改生效。

```bash
# 停止当前服务器 (Ctrl+C)
# 然后运行：
npm run dev
# 或者
pnpm dev
```
