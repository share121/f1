import "./style.less";
import playSvg from "./play.svg?raw";
import pauseSvg from "./pause.svg?raw";
import ffmpegUrl from "/ffmpeg.exe?url";
import "./config";
import workerUrl from "modern-screenshot/worker?url";
import {
  Context,
  createContext,
  destroyContext,
  domToBlob,
} from "modern-screenshot";

const stageEl = document.querySelector<HTMLDivElement>("#stage")!;
const rangeEl = document.querySelector<HTMLInputElement>(".range")!;
const startEl = document.querySelector<HTMLSpanElement>(".start")!;
const videoEl = document.querySelector<HTMLVideoElement>("#video")!;
const audioEl = document.querySelector<HTMLAudioElement>("#audio")!;
const timeEl = document.querySelector<HTMLSpanElement>(".time")!;
const exportEl = document.querySelector<HTMLButtonElement>(".export")!;
const fpsEl = document.querySelector<HTMLInputElement>(".fps")!;
const canvasEl = document.querySelector<HTMLCanvasElement>(".canvas")!;
const totalTimeEl = document.querySelector<HTMLInputElement>(".total-time")!;
const speedRateEl = document.querySelector<HTMLInputElement>(".speed-rate")!;
const startPosEl = document.querySelector<HTMLInputElement>(".start-pos")!;
const mainEl = document.querySelector<HTMLDivElement>(".main")!;
const curFrameEl = document.querySelector<HTMLSpanElement>(".cur-frame")!;
const totalFrameEl = document.querySelector<HTMLSpanElement>(".total-frame")!;
const videoTotalTimeEl =
  document.querySelector<HTMLSpanElement>(".video-total-time")!;
const videoAspectRatioEl = document.querySelector<HTMLInputElement>(
  ".video-aspect-ratio"
)!;
const videoWidthEl = document.querySelector<HTMLInputElement>(".video-width")!;
const importEl = document.querySelector<HTMLButtonElement>(".import")!;
const delayTimeEl = document.querySelector<HTMLInputElement>(".delay-time")!;
const personDelayEl =
  document.querySelector<HTMLInputElement>(".person-delay")!;
const cmdEl = document.querySelector<HTMLTextAreaElement>(".cmd")!;
const ctx = canvasEl.getContext("2d")!;

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function updateCmd() {
  const fps = +fpsEl.value;
  const totalTime = +totalTimeEl.value * 1e3;
  const frameCount = Math.ceil((totalTime * fps) / 1e3);
  const padlen = frameCount.toString().length;
  totalFrameEl.textContent = frameCount + "";
  cmdEl.value = `.\\ffmpeg -r ${fps} -i .\\frames\\%${padlen}d.png -i audio.${
    window.音频扩展名 ?? "flac"
  } -c:v libx264 -shortest -af apad -crf 0 -pix_fmt yuv420p output.mp4 -y`;
}

function formatTime(ms: number) {
  const min = Math.floor(ms / 6e4).toString();
  const sec = Math.floor((ms / 1e3) % 60).toString();
  return min.padStart(2, "0") + ":" + sec.padStart(2, "0");
}

function drawVideo(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
}

function init() {
  if (window.视频路径) videoEl.src = window.视频路径;
  if (window.音频路径) audioEl.src = window.音频路径;
  if (window.视频时长) {
    totalTimeEl.value = window.视频时长 + "";
    videoTotalTimeEl.textContent = formatTime(window.视频时长 * 1e3);
    rangeEl.max = window.视频时长 * 1e3 + "";
  }
  if (window.视频纵横比) {
    videoAspectRatioEl.value = window.视频纵横比;
    stageEl.style.aspectRatio = window.视频纵横比;
  }
  if (window.视频帧率) fpsEl.value = window.视频帧率 + "";
  if (window.视频宽度) videoWidthEl.value = window.视频宽度 + "";
  if (window.动画延迟) {
    delayTimeEl.value = window.动画延迟 + "";
    document.documentElement.style.setProperty(
      "--common-delay",
      window.动画延迟 + "s"
    );
  }
  if (window.人物间延迟) {
    personDelayEl.value = window.人物间延迟 + "";
    document.documentElement.style.setProperty(
      "--person-delay",
      window.人物间延迟 + "s"
    );
  }
  if (window.配置) {
    [...document.querySelectorAll(".main")]
      .filter((_, i) => i >= window.配置!.length)
      .forEach((e) => e.remove());
    for (
      let i = window.配置.length - document.querySelectorAll(".main").length;
      i;
      i--
    ) {
      stageEl.appendChild(mainEl.cloneNode(true));
    }
    document.querySelectorAll<HTMLDivElement>(".main").forEach((e, i) => {
      const item = window.配置![i];
      e.style.setProperty("--n", i + "");
      if (item.动画延迟)
        e.style.setProperty("--self-delay", item.动画延迟 + "s");
      if (item.人物大小)
        e.style.setProperty("--person-size", item.人物大小 + "");
      if (item.人物图片)
        e.querySelector<HTMLImageElement>(".person")!.src = item.人物图片;
      if (item.国旗图片)
        e.querySelector<HTMLImageElement>(".national-flag")!.src =
          item.国旗图片;
      if (item.奖项)
        e.querySelector<HTMLDivElement>(".prize")!.innerText = item.奖项;
      if (item.名字?.普通版文字)
        e.querySelector<HTMLSpanElement>(".name-normal")!.innerText =
          item.名字.普通版文字;
      if (item.名字?.放大版文字)
        e.querySelector<HTMLSpanElement>(".name-big")!.innerText =
          item.名字.放大版文字;
      if (item.赞助商1)
        e.querySelector<HTMLImageElement>(".sponsor-1")!.src = item.赞助商1;
      if (item.分数)
        e.querySelector<HTMLDivElement>(".score")!.innerText = item.分数;
      if (item.赞助商2)
        e.querySelector<HTMLImageElement>(".sponsor-2")!.src = item.赞助商2;
      if (item.赞助商3)
        e.querySelector<HTMLImageElement>(".sponsor-3")!.src = item.赞助商3;
      if (item.广告)
        e.querySelector<HTMLDivElement>(".ads")!.innerText = item.广告;
    });
  }
  updateCmd();
}

setTimeout(init);

new ResizeObserver((entries) =>
  stageEl.style.setProperty("--width", entries[0].contentRect.width + "px")
).observe(stageEl);

videoAspectRatioEl.addEventListener("input", () => {
  stageEl.style.aspectRatio = videoAspectRatioEl.value;
});
delayTimeEl.addEventListener("input", () => {
  document.documentElement.style.setProperty(
    "--common-delay",
    delayTimeEl.value + "s"
  );
});
personDelayEl.addEventListener("input", () => {
  document.documentElement.style.setProperty(
    "--person-delay",
    personDelayEl.value + "s"
  );
});
totalTimeEl.addEventListener("input", () => {
  const value = +totalTimeEl.value;
  rangeEl.max = value * 1e3 + "";
  videoTotalTimeEl.textContent = formatTime(value * 1e3);
  updateCmd();
});
speedRateEl.addEventListener("input", () => {
  let value = Math.min(Math.max(+speedRateEl.value, 0.1), 16);
  speedRateEl.value = value + "";
  const isPlaying = pause();
  audioEl.playbackRate = videoEl.playbackRate = value;
  if (isPlaying) play();
});
let isPlaying = false;
rangeEl.addEventListener("pointerdown", () => {
  isPlaying = pause();
});
rangeEl.addEventListener("input", () => {
  const value = +rangeEl.value;
  document.documentElement.style.setProperty("--progress", -value + "ms");
  videoEl.currentTime = (value / 1e3) % videoEl.duration;
  drawVideo(ctx);
  audioEl.currentTime = (value / 1e3) % audioEl.duration;
  timeEl.textContent = formatTime(value);
});
rangeEl.addEventListener("pointerup", () => {
  if (isPlaying) play();
});
rangeEl.addEventListener("pointercancel", () => {
  if (isPlaying) play();
});
let timer: number | undefined = void 0;
startEl.addEventListener("click", () => {
  if (typeof timer === "number") pause();
  else play();
});
function pause() {
  const isPlaying = !videoEl.paused;
  if (typeof timer === "number") cancelAnimationFrame(timer);
  timer = void 0;
  startEl.innerHTML = playSvg;
  videoEl.pause();
  audioEl.pause();
  return isPlaying;
}
function play() {
  startEl.innerHTML = pauseSvg;
  const curTime = +rangeEl.value;
  if (curTime >= +rangeEl.max) {
    rangeEl.value = "0";
    document.documentElement.style.setProperty("--progress", "0ms");
    videoEl.currentTime = 0;
    drawVideo(ctx);
    audioEl.currentTime = 0;
    timeEl.textContent = "00:00";
    return setTimeout(play);
  }
  videoEl.play();
  audioEl.play();
  let startTime = performance.now();
  (function animate(v: number) {
    timer = requestAnimationFrame(animate);
    drawVideo(ctx);
    rangeEl.value = curTime + (v - startTime) * +speedRateEl.value + "";
    if (+rangeEl.value >= +rangeEl.max) pause();
    document.documentElement.style.setProperty(
      "--progress",
      -rangeEl.value + "ms"
    );
    timeEl.textContent = formatTime(+rangeEl.value);
  })(performance.now());
}
fpsEl.addEventListener("input", updateCmd);
exportEl.addEventListener("click", async () => {
  const fps = +fpsEl.value;
  const totalTime = +totalTimeEl.value * 1e3;
  const delta = 1e3 / fps;
  const frameCount = Math.ceil((totalTime * fps) / 1e3);
  const padlen = frameCount.toString().length;
  const startPos = +startPosEl.value;
  const stageCloneEl = stageEl.cloneNode(true) as HTMLDivElement;
  stageCloneEl.style.width = videoWidthEl.value + "px";
  stageCloneEl.style.setProperty("--width", videoWidthEl.value + "px");
  stageCloneEl.style.aspectRatio = videoAspectRatioEl.value;
  stageCloneEl.id = "clone";
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.left = "0";
  div.style.transform = "translate(-100%, -100%)";
  div.appendChild(stageCloneEl);
  document.body.appendChild(div);
  totalFrameEl.textContent = frameCount + "";
  const canvas = div.querySelector<HTMLCanvasElement>(".canvas")!;
  const ctxClone = canvas.getContext("2d")!;
  exportEl.textContent = "导出中…";
  let context: Context<HTMLDivElement> | undefined;
  try {
    const handle = await showDirectoryPicker({
      id: "export",
      mode: "readwrite",
    });
    context = await createContext(stageCloneEl, {
      workerUrl,
      workerNumber: 80,
    });
    videoEl.currentTime = ((delta * startPos) / 1e3) % videoEl.duration;
    drawVideo(ctx);
    drawVideo(ctxClone);
    const framesHandle = await handle.getDirectoryHandle("frames", {
      create: true,
    });
    const promises = [
      handle
        .getFileHandle("audio." + (window.音频扩展名 ?? "flac"), {
          create: true,
        })
        .then((h) => h.createWritable())
        .then(async (w) => (await fetch(audioEl.src)).body?.pipeTo(w)),
      handle
        .getFileHandle("ffmpeg.exe", { create: true })
        .then((h) => h.createWritable())
        .then(async (w) => (await fetch(ffmpegUrl)).body?.pipeTo(w)),
    ];
    await delay(1e3);
    for (let i = startPos; i <= frameCount; i++) {
      const value = delta * i;
      rangeEl.value = value + "";
      document.documentElement.style.setProperty("--progress", -value + "ms");
      videoEl.currentTime = (value / 1e3) % videoEl.duration;
      drawVideo(ctx);
      drawVideo(ctxClone);
      timeEl.textContent = formatTime(value);
      const hNewFile = framesHandle.getFileHandle(
        i.toString().padStart(padlen, "0") + ".png",
        { create: true }
      );
      const data = await domToBlob(context);
      promises.push(
        (async () => {
          const w = await (await hNewFile).createWritable();
          await w.write(data);
          await w.close();
        })()
      );
      curFrameEl.textContent = i + "";
    }
    await Promise.all(promises);
    exportEl.textContent = "导出完成";
  } catch (e) {
    exportEl.textContent = "导出失败";
    throw e;
  } finally {
    if (context) destroyContext(context);
    div.remove();
  }
});
importEl.addEventListener("click", async () => {
  try {
    const dirHandle = await showDirectoryPicker({
      id: "import",
    });
    const config: {
      [k: string]: string;
    }[] = [];
    for await (const [
      name,
      handle,
      // @ts-ignore
    ] of dirHandle.entries() as AsyncIterableIterator<
      [string, FileSystemHandle]
    >) {
      if (handle instanceof FileSystemFileHandle) {
        if (name === "配置.json") {
          const file = await handle.getFile();
          const data: {} = JSON.parse(await file.text());
          for (const [k, v] of Object.entries(data)) {
            window[k] = v;
          }
        } else if (name.startsWith("视频")) {
          window.视频路径 = URL.createObjectURL(await handle.getFile());
        } else if (name.startsWith("音频")) {
          window.音频路径 = URL.createObjectURL(await handle.getFile());
          window.音频扩展名 = name.split(".").at(-1)!;
        }
      } else if (handle instanceof FileSystemDirectoryHandle) {
        const m = name.match(/^(\d+)-?/)!;
        const index = +m[1];
        const t: {
          [k: string]: any;
        } = (config[index] = {});
        for await (const [
          name,
          innerhandle,
          // @ts-ignore
        ] of handle.entries() as AsyncIterableIterator<
          [string, FileSystemHandle]
        >) {
          if (innerhandle instanceof FileSystemFileHandle) {
            if (name.startsWith("人")) {
              t.人物图片 = URL.createObjectURL(await innerhandle.getFile());
            } else if (name.startsWith("国旗")) {
              t.国旗图片 = URL.createObjectURL(await innerhandle.getFile());
            } else if (name.startsWith("1")) {
              t.赞助商1 = URL.createObjectURL(await innerhandle.getFile());
            } else if (name.startsWith("2")) {
              t.赞助商2 = URL.createObjectURL(await innerhandle.getFile());
            } else if (name.startsWith("3")) {
              t.赞助商3 = URL.createObjectURL(await innerhandle.getFile());
            } else if (name === "配置.json") {
              const file = await innerhandle.getFile();
              const data = JSON.parse(await file.text());
              for (const [k, v] of Object.entries(data)) {
                t[k] = v;
              }
            }
          }
        }
      }
    }
    // @ts-ignore
    window.配置 = config.filter(() => true);
    init();
    importEl.textContent = "导入成功";
  } catch (e) {
    importEl.textContent = "导入失败";
    throw e;
  }
});
