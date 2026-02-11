# 后端服务详细文档 (NextTodo)

## 1. 架构概览

本项目使用 **Next.js App Router (v16)** 作为后端框架，结合 **Prisma ORM** 进行数据库管理，认证方案使用 **NextAuth.js (v4)**。

### 技术栈
- **Framework**: Next.js 16.1.6
- **Database**: MySQL (通过 Prisma 访问)
- **ORM**: Prisma Client v5.22.0
- **Authentication**: NextAuth.js v4 + Credentials Provider
- **Security**: bcryptjs 用于密码加密

---

## 2. 数据库设计 (Prisma)

### 数据模型 (`prisma/schema.prisma`)

#### User (用户)
| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `id` | `Int` | 主键，自增 |
| `email` | `String` | 唯一，登录邮箱 |
| `password` | `String` | 加密后的密码 |
| `name` | `String?` | 选填，用户昵称 |
| `todos` | `Todo[]` | 关联关系：一个用户拥有多个 Todo |
| `createdAt` | `DateTime` | 创建时间 |
| `updatedAt` | `DateTime` | 更新时间 |

#### Todo (待办事项)
| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `id` | `Int` | 主键，自增 |
| `title` | `String` | 待办内容标题 |
| `completed` | `Boolean` | 默认 `false`，完成状态 |
| `userId` | `Int` | 外键，关联 `User.id` |
| `user` | `User` | 关联关系：属于哪个用户 |
| `createdAt` | `DateTime` | 创建时间 |
| `updatedAt` | `DateTime` | 更新时间 |

---

## 3. 核心功能模块

### 3.1 身份认证 (`src/lib/auth.ts`)

#### 认证方式
- 使用 **Credentials Provider**（邮箱+密码）。
- **流程**：
    1. 接收 `email` 和 `password`。
    2. 查询数据库中是否存在该用户。
    3. 使用 `bcryptjs.compare` 校验密码。
    4. 成功则返回用户信息（id, email, name）。

#### Session 管理
- 使用 **JWT Strategy**。
- 自定义回调 (`callbacks`)：
    - `jwt`: 将用户 `id` 写入 token。
    - `session`: 将 token 中的 `id` 写入 session，确保前端可以通过 `useSession().data.user.id` 获取用户 ID。

#### 保护机制
- 未登录用户访问受保护 API 时返回 `401 Unauthorized`。
- 登录页面重定向配置：`pages.signIn: '/login'`。

---

### 3.2 API 路由接口

#### **注册接口** (`POST /api/register`)
- **功能**：创建新用户。
- **参数**：
    ```json
    { "email": "test@example.com", "password": "123", "name": "Test" }
    ```
- **逻辑**：
    1. 校验必填项。
    2. 检查邮箱是否已存在。
    3. 使用 `bcrypt.hash` 加密密码 (salt: 10)。
    4. 写入数据库。
- **返回**：`201 Created` 或错误信息。

#### **待办事项列表** (`GET /api/todos`)
- **功能**：获取**当前登录用户**的所有待办事项。
- **权限**：需要 **Login**。
- **逻辑**：
    1. 验证 Session。
    2. `prisma.todo.findMany({ where: { userId } })`。
    3. 按 `createdAt` 降序排列。
- **返回**：Todo 对象数组。

#### **创建待办** (`POST /api/todos`)
- **功能**：为当前用户添加新的待办。
- **参数**：
    ```json
    { "title": "Buy milk" }
    ```
- **权限**：需要 **Login**。
- **逻辑**：
    1. 验证 Session。
    2. `prisma.todo.create`，自动关联当前 `userId`。

#### **更新待办** (`PUT /api/todos/[id]`)
- **功能**：修改待办状态或标题。
- **参数**：
    ```json
    { "completed": true, "title": "New Title" }
    ```
- **权限**：需要 **Login** 且必须是**待办的所有者**。
- **逻辑**：
    1. 查询 Todo 是否存在。
    2. 校验 `todo.userId === session.user.id`。
    3. 仅更新传入的字段。

#### **删除待办** (`DELETE /api/todos/[id]`)
- **功能**：删除指定待办。
- **权限**：需要 **Login** 且必须是**待办的所有者**。
- **逻辑**：
    1. 查询并校验权限（同上）。
    2. 执行删除操作。

---

## 4. 关键工具类

### Prisma 客户端单例 (`src/lib/prisma.ts`)
为了防止在 Next.js 开发环境下（Hot Reload）创建过多的数据库连接，使用了 `globalForPrisma` 模式来缓存 `PrismaClient` 实例。

```typescript
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({...});
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## 5. 环境配置 (.env)

| 变量名 | 说明 | 示例 |
| :--- | :--- | :--- |
| `DATABASE_URL` | MySQL 连接字符串 | `mysql://root:123456@localhost:3306/next_todo` |
| `NEXTAUTH_SECRET` | JWT 加密密钥 | `openssl rand -base64 32` 生成 |
| `NEXTAUTH_URL` | 站点根地址 | `http://localhost:3000` |
