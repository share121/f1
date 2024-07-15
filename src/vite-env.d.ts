/// <reference types="vite/client" />
export { };

declare global {
  function showDirectoryPicker(
    option?: Partial<{
      id: string;
      mode: "read" | "readwrite";
      startIn:
      | FileSystemHandle
      | "desktop"
      | "documents"
      | "downloads"
      | "music"
      | "pictures"
      | "videos";
    }>
  ): Promise<FileSystemDirectoryHandle>;
  interface Window {
    视频路径: string;
    音频路径: string;
    视频时长: number;
    视频纵横比: string;
    视频时长: number;
    视频帧率: number;
    视频宽度: number;
    动画延迟: number;
    人物间延迟: number;
    音频扩展名: string;
    配置: {
      动画延迟: number;
      人物图片: string;
      国旗图片: string;
      奖项: string;
      名字: {
        普通版文字: string;
        放大版文字: string;
      };
      赞助商1: string;
      分数: string;
      赞助商2: string;
      赞助商3: string;
      广告: string;
    }[];
    [k: string]: any;
  }
}
