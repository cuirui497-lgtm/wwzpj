# 崔睿 · 个人作品集
React + Vite，暗色桌面优先布局，1700px 最大版心。

## 启动
npm install
npm run dev

## 构建
npm run build
npm run preview

内容：`src/projects.json` 管理项目，`src/main.jsx` 管理经历、联系方式和页面，`src/style.css` 管理视觉样式。图片与视频位于 `public/assets`。

项目详情支持点击卡片打开、Esc 关闭；分类按钮筛选作品；微信按钮复制微信号；邮箱和电话使用系统应用打开。首页视频来自提供的准儿机器人素材，可暂停，减少动态效果设置下不显示视频。

数据来自用户提供的简历与 8 个项目文件夹。2020 起表示首段工作经历起点，8 组为素材分类数量，4 段为简历列出的工作经历数量。未添加未经证实的业绩数字。

## 当前 Mac 直接启动
依赖已经安装。可双击 `start.command`（或在终端运行 `./start.command`）。脚本优先使用系统 Node，未安装时使用当前 Codex 自带的 Node。预览地址以终端实际输出为准。

## 性能优化（2026-10-28）
- 首屏背景使用高优先级响应式 WebP 和 preload；头像、项目封面提供不同尺寸，详情图预留尺寸并异步解码。
- 视频按视口挂载且 preload=none；原 GIF 转为低体积 H.264 循环视频，仅可见且允许动画时播放。
- SVG 背景通过 IntersectionObserver 和 visibilitychange 离屏暂停；没有 WebGL、GSAP 或 scroll 事件监听。
- 原始大素材保留于 source-archive/，不进入 public 或 dist；用户最初提供的文件未修改。
- 图片处理脚本为 scripts/optimize-images.py；视频脚本需要 imageio-ffmpeg（当前安装在 /tmp/portfolio-video-tools）。视频转码有损，原件可用于重新输出更高清版本。
