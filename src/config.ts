window.视频路径 = new URL("./asset/F1赛车.mp4", import.meta.url) + "";
window.音频路径 =
  new URL("./asset/Sea of Tranquility-BeMax.flac", import.meta.url) + "";
window.音频扩展名 = window.音频路径.split(".").at(-1)!;
window.视频时长 = 26;
window.视频帧率 = 60;
window.视频宽度 = 3840;
window.视频纵横比 = "16 / 9";
window.动画延迟 = 4;
window.人物间延迟 = 3.5;
window.配置 = [
  {
    动画延迟: 0,
    人物大小: 1,
    人物图片: "卡洛斯·赛恩斯.webp",
    国旗图片: "新加坡国旗.webp",
    奖项: "SINGAPORE\nGRAND PRIX",
    名字: { 普通版文字: "CARLOS", 放大版文字: "SAINZ" },
    赞助商1: "法拉利.webp",
    分数: "1:30.984",
    赞助商2: "F1.svg",
    赞助商3: "pirelli.svg",
    广告: "Global Tyre Partner of Formula 1*",
  },
  {
    动画延迟: 0,
    人物大小: 1,
    人物图片: "派蒙.webp",
    国旗图片: "中国国旗.webp",
    奖项: "The Game Awards\n2022",
    名字: { 普通版文字: "Genshin", 放大版文字: "Impact" },
    赞助商1: "原神图标.webp",
    分数: "99:99.99",
    赞助商2: "原神.webp",
    赞助商3: "米哈游.webp",
    广告: "TECH OTAKUS SAVE THE WORLD",
  },
  {
    动画延迟: 0,
    人物大小: 1,
    人物图片: "三月七.webp",
    国旗图片: "中国国旗.webp",
    奖项: "The Game Awards\n2023",
    名字: { 普通版文字: "Honkai", 放大版文字: "Star Rail" },
    赞助商1: "崩坏星穹铁道图标.webp",
    分数: "37:37.37",
    赞助商2: "崩坏星穹铁道.webp",
    赞助商3: "米哈游.webp",
    广告: "TECH OTAKUS SAVE THE WORLD",
  },
  {
    动画延迟: 0,
    人物大小: 1,
    人物图片: "安比.webp",
    国旗图片: "中国国旗.webp",
    奖项: "ERROR 404",
    名字: { 普通版文字: "Zenless", 放大版文字: "Zone Zero" },
    赞助商1: "绝区零图标.webp",
    分数: "1:23.45",
    赞助商2: "绝区零.webp",
    赞助商3: "米哈游.webp",
    广告: "TECH OTAKUS SAVE THE WORLD",
  },
  {
    动画延迟: 0,
    人物大小: 1,
    人物图片: "史蒂夫.webp",
    国旗图片: "瑞典国旗.webp",
    奖项: "Indie of the Year Awards",
    名字: { 普通版文字: "我的世界", 放大版文字: "Minecraft" },
    赞助商1: "我的世界图标.webp",
    分数: "98:76.54",
    赞助商2: "我的世界.svg",
    赞助商3: "Mojang.webp",
    广告: "",
  },
  {
    动画延迟: 0,
    人物大小: 1,
    人物图片: "美游.webp",
    国旗图片: "韩国国旗.webp",
    奖项: "NEXON\nGames",
    名字: { 普通版文字: "Blue", 放大版文字: "Archive" },
    赞助商1: "蔚蓝档案图标.webp",
    分数: "5:10.98",
    赞助商2: "蔚蓝档案.webp",
    赞助商3: "nexon.svg",
    广告: "ᕕ(◠ڼ◠)ᕗ",
  },
].map((v) => ({
  ...v,
  人物图片: new URL(`./asset/${v.人物图片}`, import.meta.url) + "",
  国旗图片: new URL(`./asset/${v.国旗图片}`, import.meta.url) + "",
  赞助商1: new URL(`./asset/${v.赞助商1}`, import.meta.url) + "",
  赞助商2: new URL(`./asset/${v.赞助商2}`, import.meta.url) + "",
  赞助商3: new URL(`./asset/${v.赞助商3}`, import.meta.url) + "",
}));
