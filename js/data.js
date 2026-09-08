/* ============================================================
 * 站点数据 —— 基于 favorites_2026_9_8.html 整理
 * 共 13 个分类 / 对应真实书签
 * ============================================================ */

/* 分类定义：id / 名称 / 线性图标(SVG 内部) / 主题色 */
const CATEGORIES = [
  {
    id: 'search', name: '信息查询', color: '#38bdf8',
    icon: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>',
  },
  {
    id: 'ai', name: 'AI 工具', color: '#a78bfa',
    icon: '<path d="M12 3l1.7 4.8L18.5 9.5 13.7 11.2 12 16l-1.7-4.8L5.5 9.5l4.8-1.7z"/><path d="M19 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  },
  {
    id: 'media', name: '视频影音', color: '#f472b6',
    icon: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  },
  {
    id: 'office', name: '办公通讯', color: '#34d399',
    icon: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18"/>',
  },
  {
    id: 'cloud', name: '云存储服务', color: '#22d3ee',
    icon: '<path d="M17.5 19a4.5 4.5 0 0 0 .4-8.98A6 6 0 0 0 6.2 8.6 4 4 0 0 0 7 19z"/>',
  },
  {
    id: 'toolbox', name: '在线工具箱', color: '#fbbf24',
    icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  },
  {
    id: 'dev', name: '编程技术', color: '#818cf8',
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  },
  {
    id: 'map', name: '地图出行', color: '#4ade80',
    icon: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  },
  {
    id: 'parse', name: '视频解析去水印', color: '#fb923c',
    icon: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>',
  },
  {
    id: 'material', name: '素材资源', color: '#e879f9',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="9" cy="9" r="1.8"/><path d="m21 15-4.1-4.1a2 2 0 0 0-2.8 0L4 21"/>',
  },
  {
    id: 'solo', name: '独立在线工具', color: '#94a3b8',
    icon: '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.59 7.59"/><circle cx="11" cy="11" r="1.8"/>',
  },
  {
    id: 'novel', name: '小说阅读', color: '#f59e0b',
    icon: '<path d="M4 6h16v14H4z M8 8h8v2H8z M8 12h6v2H8z M8 16h8v2H8z"/>',
  },
  {
    id: 'mobile', name: '手机应用', color: '#3b82f6',
    icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/>',
  },
];

/* 站点：name 简称 / desc 一句话描述 / url 真实网址 / cat 分类 id / kw 搜索辅助词 */
const SITES = [
  // —— 信息查询 ——
  { name: '手机号段网', desc: '手机号段信息查询平台', url: 'https://telphone.cn/', cat: 'search', kw: '手机 号码 归属地 运营商' },
  { name: '查号吧', desc: '电话区号、号码归属地与号段查询', url: 'https://www.chahaoba.com/', cat: 'search', kw: '区号 电话 查号' },
  { name: 'IP.cn', desc: 'IP地址、归属地、DNS查询', url: 'https://ip.cn/', cat: 'search', kw: 'ip 归属地 dns 查询' },

  // —— AI 工具 ——
  { name: '豆包', desc: '字节跳动旗下 AI 智能助手', url: 'https://www.doubao.com/', cat: 'ai', kw: 'doubao 字节 聊天 大模型' },
  { name: 'DeepSeek', desc: '深度求索 · 高性能大模型对话', url: 'https://www.deepseek.com/', cat: 'ai', kw: '深度求索 deepseek r1 推理' },
  { name: '腾讯元宝', desc: '腾讯旗下全能 AI 助手', url: 'https://yuanbao.tencent.com/', cat: 'ai', kw: 'yuanbao 腾讯 混元 搜索' },
  { name: '通义千问', desc: '阿里旗下 AI 助手', url: 'https://www.qianwen.com/', cat: 'ai', kw: 'qianwen 阿里 千问 通义' },
  { name: '即梦 AI', desc: '一站式 AI 图片 / 视频创作平台', url: 'https://jimeng.jianying.com/', cat: 'ai', kw: 'jimeng 剪映 画图 生视频' },
  { name: 'Kimi', desc: '专为智能体编程与知识工作打造的 AI 助手', url: 'https://www.kimi.com/', cat: 'ai', kw: 'kimi 月之暗面 智能体' },
  { name: 'LiblibAI', desc: '国内极具影响力的 AI 创作平台', url: 'https://www.liblib.art/', cat: 'ai', kw: 'liblib 哩布哩布 绘画' },
  { name: 'AI工具集', desc: '1000+ AI工具集合导航', url: 'https://ai-bot.cn/', cat: 'ai', kw: 'ai 工具 导航 集合' },
  { name: 'AIHub', desc: '发现全网最新热门 AI 工具和网站', url: 'https://www.aihub.cn/', cat: 'ai', kw: 'aihub 工具 导航' },
  { name: '天工 AI', desc: '天工 AI 智能助手', url: 'https://www.tiangong.cn/', cat: 'ai', kw: '天工 昆仑 大模型' },

  // —— 视频影音 ——
  { name: '抖音', desc: '抖音精选 · 优质短视频平台电脑版', url: 'https://www.douyin.com/', cat: 'media', kw: 'douyin 短视频 直播' },
  { name: '快手', desc: '快手短视频平台', url: 'https://www.kuaishou.com/', cat: 'media', kw: 'kuaishou 短视频 直播' },
  { name: '哔哩哔哩', desc: 'bilibili · 弹幕视频社区', url: 'https://www.bilibili.com/', cat: 'media', kw: 'b站 bilibili 番剧 up主' },
  { name: 'Mineradio', desc: '免费开源音乐播放器', url: 'https://mineradio.cn/', cat: 'media', kw: 'mineradio 音乐 播放器 开源' },
  { name: '网易云音乐', desc: '在线音乐 · 歌单与评论社区', url: 'https://music.163.com/', cat: 'media', kw: '云村 歌曲 歌单 163' },
  { name: 'QQ 音乐', desc: '千万正版曲库 · 无损音乐平台', url: 'https://y.qq.com/', cat: 'media', kw: 'qqmusic 歌曲 绿钻' },
  { name: '酷狗音乐', desc: '就是歌多 · 音乐小说相声平台', url: 'https://www.kugou.com/', cat: 'media', kw: 'kugou 歌曲 有声书' },
  { name: '腾讯视频', desc: '海量高清剧集电影在线观看', url: 'https://v.qq.com/', cat: 'media', kw: 'v.qq 电视剧 综艺 动漫' },
  { name: '爱奇艺', desc: '热门独播剧集与综艺在线观看', url: 'https://www.iqiyi.com/', cat: 'media', kw: 'iqiyi 迷雾剧场 独播' },
  { name: '优酷', desc: '剧集综艺电影 · 为好内容全力以赴', url: 'https://www.youku.com/', cat: 'media', kw: 'youku 土豆 视频' },
  { name: '夸克网盘分享', desc: '夸克网盘影视资源分享', url: 'https://pan.quark.cn/s/6e4c6fa3bc6f#/list/share', cat: 'media', kw: '夸克 网盘 分享 影视' },

  // —— 办公通讯 ——
  { name: '微信', desc: '微信 · 是一个生活方式（电脑版）', url: 'https://weixin.qq.com/', cat: 'office', kw: 'wechat 聊天 电脑版下载' },
  { name: 'QQ', desc: 'QQ · 轻松做自己（电脑版）', url: 'https://im.qq.com/index/#/', cat: 'office', kw: '腾讯qq 聊天 通讯' },
  { name: '网易UU远程', desc: '免费远程控制软件', url: 'https://uuyc.163.com/', cat: 'office', kw: 'uu 远程 控制 网易' },
  { name: 'ToDesk', desc: '免费远程桌面连接', url: 'https://www.todesk.com/', cat: 'office', kw: 'todesk 远程 控制' },
  { name: '向日葵', desc: '远程控制与运维管理工具', url: 'https://sunlogin.oray.com/', cat: 'office', kw: 'sunlogin 向日葵 远程' },
  { name: 'vivo 办公套件', desc: 'vivo 手机平板与电脑多端互联', url: 'https://quantumkit.vivo.com/', cat: 'office', kw: 'vivo 量子套件 互联 投屏' },
  { name: 'OPPO 互联', desc: 'OPPO / 一加 / iPhone 多设备互联', url: 'https://connect.oppo.com/', cat: 'office', kw: 'oppo 一加 跨屏 互联' },
  { name: '飞书', desc: '字节跳动旗下 AI 协作办公平台', url: 'https://www.feishu.cn/', cat: 'office', kw: 'feishu lark 文档 会议 协作' },
  { name: '钉钉', desc: '钉钉 · AI 时代的工作方式', url: 'https://www.dingtalk.com/', cat: 'office', kw: 'dingtalk 考勤 审批 办公' },
  { name: 'WPS', desc: '多人在线协作编辑 Word / Excel / PPT', url: 'https://www.wps.cn/', cat: 'office', kw: 'wps office 文档 表格' },
  { name: 'Adobe全家桶下载', desc: 'Adobe 全家桶下载资源（语雀）', url: 'https://www.yuque.com/u21273750/kb/axk115prl1rtuprr', cat: 'office', kw: 'adobe 全家桶 下载' },
  { name: '鹿角软件', desc: '专注分享实用软件', url: 'https://lujiaorj.com/#Adobe', cat: 'office', kw: '鹿角 软件 下载' },

  // —— 云存储服务 ——
  { name: 'vivo 云服务', desc: 'vivo 云端备份与同步', url: 'https://yun.vivo.com.cn/', cat: 'cloud', kw: 'vivo 云盘 备份 同步' },
  { name: 'OPPO 云服务', desc: 'OPPO 云端数据备份与查找', url: 'https://cloud.oppo.com/', cat: 'cloud', kw: 'oppo 云 备份 找回手机' },
  { name: '小米云服务', desc: '小米云端账号与数据服务', url: 'https://account.xiaomi.com/', cat: 'cloud', kw: '小米 账号 云服务' },
  { name: '华为云', desc: '华为云服务', url: 'https://auth.huaweicloud.com/', cat: 'cloud', kw: '华为 云 登录' },
  { name: '123 云盘', desc: '免费不限速 · 免登录直链下载', url: 'https://www.123pan.com/', cat: 'cloud', kw: '123pan 网盘 不限速 cdn' },
  { name: '百度网盘', desc: '超大容量 · 文件共享与存储安全', url: 'https://pan.baidu.com/', cat: 'cloud', kw: 'baidu 网盘 分享 下载' },
  { name: '阿里云盘', desc: '备份无忧 · 整理有序', url: 'https://www.alipan.com/', cat: 'cloud', kw: 'alipan 夸克 网盘 不限速' },
  { name: '夸克网盘', desc: '阿里旗下云盘，安全存储与极速传输', url: 'https://pan.quark.cn/', cat: 'cloud', kw: 'quark 夸克 网盘' },
  { name: '迅雷云盘', desc: '迅雷云存储服务', url: 'https://pan.xunlei.com/', cat: 'cloud', kw: '迅雷 云盘' },
  { name: '蓝奏云', desc: '云存储与文件分享', url: 'https://www.lanzouw.com/', cat: 'cloud', kw: '蓝奏 云盘 分享' },
  { name: '天翼云盘', desc: '中国电信云存储服务', url: 'https://cloud.189.cn/', cat: 'cloud', kw: '天翼 云盘 备份' },

  // —— 在线工具箱 ——
  { name: '图吧工具箱', desc: '开源免费的硬件检测工具集合', url: 'https://tbool.cn/', cat: 'toolbox', kw: '图吧 硬件检测 装机 测温' },
  { name: '帮小忙', desc: '腾讯 QQ 浏览器在线工具箱', url: 'https://tool.browser.qq.com/', cat: 'toolbox', kw: '腾讯 qq浏览器 工具 文本处理' },
  { name: '365 工具箱', desc: '免费在线小工具集 · 数据本地存储', url: 'https://www.toolbox365.cn/', cat: 'toolbox', kw: '365 工具集合 免登录' },
  { name: 'DevToolBox', desc: '200+ 免费实用小工具 · 效率合集', url: 'https://devtoolbox.online/zh-CN/tools', cat: 'toolbox', kw: 'dev 开发 工具 转换 编码' },
  { name: 'JSON.cn', desc: 'JSON 在线解析、格式化与校验', url: 'https://www.json.cn/', cat: 'toolbox', kw: 'json 格式化 压缩 校验' },
  { name: '布丁云工具箱', desc: '简单好用的在线工具集合', url: 'https://web.idcbdy.com/', cat: 'toolbox', kw: '布丁 工具 在线' },
  { name: '菜鸟工具', desc: '在线实用工具集合', url: 'https://www.jyshare.com/', cat: 'toolbox', kw: '菜鸟 工具 在线' },
  { name: '工具哇', desc: '在线工具大全', url: 'https://toolwa.com/', cat: 'toolbox', kw: 'toolwa 工具' },
  { name: '落尘之木', desc: '个人博客与工具分享', url: 'https://www.luochenzhimu.com/', cat: 'toolbox', kw: '落尘之木 博客' },
  { name: '当快软件园', desc: 'PC 软件下载中心', url: 'https://www.downkuai.com/soft/', cat: 'toolbox', kw: '软件 下载 pc' },
  { name: 'ioDraw', desc: '免费在线流程图、思维导图制作', url: 'https://www.iodraw.com/', cat: 'toolbox', kw: 'iodraw 流程图 思维导图' },

  // —— 编程技术 ——
  { name: 'VS Code', desc: '开源 AI 代码编辑器', url: 'https://code.visualstudio.com/', cat: 'dev', kw: 'vscode microsoft 编辑器 插件' },
  { name: 'JetBrains', desc: '面向开发者与团队的专业 IDE', url: 'https://www.jetbrains.com/zh-cn/', cat: 'dev', kw: 'idea pycharm webstorm ide' },
  { name: 'Python', desc: 'Python 编程语言官方网站', url: 'https://www.python.org/', cat: 'dev', kw: 'python 官网 pip 文档' },
  { name: 'Cursor', desc: 'AI Coding Agent · 智能编程编辑器', url: 'https://cursor.com/cn', cat: 'dev', kw: 'cursor ai写代码 补全' },
  { name: 'GitHub', desc: '全球最大的代码托管与开源社区', url: 'https://github.com/', cat: 'dev', kw: 'git 开源 仓库 项目' },
  { name: 'Trae', desc: 'The Real AI Engineer · AI 开发工程师', url: 'https://www.trae.cn/', cat: 'dev', kw: 'trae 字节 ai ide 编程' },

  // —— 地图出行 ——
  { name: '百度地图', desc: '智能路线规划与位置信息搜索', url: 'https://map.baidu.com/', cat: 'map', kw: 'baidu 导航 街景 公交' },
  { name: '高德地图', desc: '精准专业的手机地图', url: 'https://ditu.amap.com/', cat: 'map', kw: 'amap 导航 路况 打车' },
  { name: '天地图', desc: '国家地理信息公共服务平台', url: 'https://map.tianditu.gov.cn/', cat: 'map', kw: '国家 测绘 官方 卫星图' },

  // —— 视频解析去水印 ——
  { name: '短视频解析平台', desc: '短视频去水印解析接口平台', url: 'https://api.spapi.cn/', cat: 'parse', kw: '去水印 接口 抖音 快手 解析' },
  { name: 'HelloTik', desc: '免费解析链接 · 去水印音视频下载', url: 'https://www.hellotik.app/zh', cat: 'parse', kw: 'hellotik tiktok 无水印 下载' },
  { name: 'SharpVideo', desc: 'SharpTools 在线视频解析', url: 'https://sharptools.top/video/', cat: 'parse', kw: 'sharp 视频 解析 下载' },
  { name: '破云 VIP 解析', desc: '在线影视会员视频解析播放', url: 'https://www.pouyun.com/', cat: 'parse', kw: 'vip 解析 会员 影视 电影' },
  { name: '落尘之木视频解析', desc: '在线视频VIP解析', url: 'https://www.luochenzhimu.com/videovip', cat: 'parse', kw: 'vip 解析 视频' },

  // —— 素材资源 ——
  { name: '千图网', desc: '正版商用设计素材与模板大全', url: 'https://www.58pic.com/', cat: 'material', kw: '千图 设计 模板 背景 矢量' },
  { name: '花瓣网', desc: '灵感之源 · 设计灵感与高清素材', url: 'https://huaban.com/', cat: 'material', kw: '花瓣 画板 灵感 采集' },
  { name: '影视飓风素材', desc: '影视级实拍视频素材下载', url: 'https://www.ysjf.com/material', cat: 'material', kw: '飓风 视频素材 4k 实拍' },
  { name: '爱给网', desc: '音效配乐、3D模型、视频素材免费下载', url: 'https://www.aigei.com/', cat: 'material', kw: '爱给 音效 模型 视频素材' },
  { name: 'PNG素材网', desc: '免费高清透明PNG素材下载', url: 'https://www.pngsucai.com/', cat: 'material', kw: 'png 素材 透明 图片' },
  { name: '百度文库', desc: '一站式文档与AI创作平台', url: 'https://wenku.baidu.com/', cat: 'material', kw: '百度 文库 文档 资料' },

  // —— 独立在线工具 ——
  { name: '凹凸工坊', desc: '手写模拟器 · 一键生成手写文稿', url: 'https://www.autohanding.com/', cat: 'solo', kw: '手写 转换 模拟器 字体 抄写' },
  { name: '网名生成器', desc: '在线网名、姓名生成器', url: 'https://www.qmsjmfb.com/', cat: 'solo', kw: '网名 生成 姓名' },
  { name: 'Apowersoft录屏', desc: '免费高清在线录屏工具', url: 'https://www.apowersoft.cn/free-online-screen-recorder', cat: 'solo', kw: '录屏 在线 无水印' },
  { name: 'Windows 11 in Svelte', desc: '基于 Svelte 的 Windows 11 体验', url: 'https://win11.yashash.com/', cat: 'solo', kw: 'windows11 svelte' },

  // —— 小说阅读（新增） ——
  { name: '纵横中文网', desc: '最新热门小说阅读平台', url: 'https://www.zongheng.com/', cat: 'novel', kw: '纵横 小说 阅读' },
  { name: '番茄小说', desc: '免费小说阅读平台', url: 'https://fanqienovel.com/', cat: 'novel', kw: '番茄 小说 免费' },
  { name: '起点中文网', desc: '阅文集团旗下小说阅读平台', url: 'https://www.qidian.com/', cat: 'novel', kw: '起点 小说 阅读' },
  { name: '书友社', desc: '海量小说无广告免费阅读', url: 'https://www.shuyous.com/', cat: 'novel', kw: '书友 小说 免费' },
  { name: '七猫中文网', desc: '全本免费小说阅读', url: 'https://www.qimao.com/', cat: 'novel', kw: '七猫 小说 免费' },

  // —— 手机应用（新增） ——
  { name: '光速下载网', desc: '专业、安全的手机软件下载站', url: 'https://m.gsxx.sh.cn/', cat: 'mobile', kw: '光速 下载 手机应用' },
  { name: '当快软件园', desc: '手机应用与游戏下载', url: 'https://www.downkuai.com/', cat: 'mobile', kw: '当快 软件 应用' },
  { name: 'vivo开放平台', desc: 'vivo 开发者与移动应用平台', url: 'https://dev.vivo.com.cn/products/pc/index', cat: 'mobile', kw: 'vivo 开放平台 开发者' },
];