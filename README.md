<h1 style="text-align: center">Easy Filestore</h1> 

Easy Filestore 是一个极其简单的文件存储服务，基于 Node.js 和 Express 构建。它允许用户上传文件并生成唯一的下载链接，支持通过 Docker 快速部署。核心代码仅 60 行，轻量且易于扩展。

### 功能特性

- 文件上传：支持通过 HTTP POST 请求上传文件。

- 文件下载：通过生成的唯一文件名下载文件。


- 唯一文件名：使用 UUID 生成唯一的文件名，避免冲突。


- 跨域支持：内置 CORS 支持，方便前端集成。


- Docker 支持：提供 Dockerfile 和 docker-compose 文件，快速部署。


### 快速开始

#### 1.本地运行

**依赖环境**

- Node.js 18+
- npm 或 yarn

**安装与运行**

- 克隆仓库：

  ```bash
  git clone https://github.com/your-repo/easy-filestore.git
  cd easy-filestore
  ```

- 安装依赖：

  ```bash
  npm install
  # 或
  yarn install
  ```

- 启动服务

  ```bash
  npm start
  # 或
  yarn start
  ```

#### 2.使用docker运行

**构建镜像**

1. 构建Docker镜像

   ```bash
   docker build -t easyfilestore:1.0 .
   ```

2. 使用docker-compose部署

   ```
   docker-compose up -d
   ```

3. 服务运行 ， 默认范围地址： **http://localhost:3009**

#### api文档

1. **文件上传**

   - **URL**: /upload

   - **Method**: POST

   - **Content-Type**: multipart/form-data

   - **请求参数**：

     `file`: 需要上传的文件（字段名必须为 file）。

   - 响应示例：

     ```json
     {
       "message": "File uploaded successfully!",
       "fileName": "a1b2c3d4-1234-5678-91011.png",
       "url": "/download/a1b2c3d4-1234-5678-91011.png"
     }
     ```

     

2. **文件下载**

  - **URL**: /download/:fileName

  - **Method**: GET

  - **请求参数**：

    `fileName`: 上传时生成的文件名。

  - 响应：

    ```json
    如果文件存在，返回文件内容。
    如果文件不存在，返回 404 File not found。
    ```

#### 配置文件

服务支持通过 `.env` 文件配置环境变量：

- PORT: 服务端口号（默认 3009）。  


#### 目录结构

```ABAP
easy-filestore/

    ├── public/                # 静态文件目录

    │   └── files/             # 上传文件存储目录

    ├── Dockerfile             # Docker 构建文件

    ├── docker-compose.yml     # Docker Compose 配置文件

    ├── index.js               # 服务核心代码

    ├── package.json           # 项目依赖

    └── README.md              # 项目文档
```



#### 部署建议

- 持久化存储：将 public/files 目录挂载到宿主机或云存储，避免容器重启后文件丢失。
- 反向代理：使用 Nginx 或 Traefik 作为反向代理，支持 HTTPS 和负载均衡。
- 日志监控：集成日志服务（如 ELK 或 Prometheus）监控服务状态。

#### 示例

- **上传文件**

  ```
  curl -F "file=@/path/to/your/file.png" http://localhost:3009/upload
  ```

- **下载文件**

  ```
  curl -O http://localhost:3009/download/a1b2c3d4-1234-5678-91011.png
  ```

  

#### 贡献

欢迎提交 Issue 或 PR 改进项目！请确保代码风格一致并通过测试。

#### 许可证

本项目基于 MIT 许可证 开源。

#### 联系

如有问题，请联系：your-email@example.com