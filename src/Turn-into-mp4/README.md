# 转换mp4注意事项
## 前提环境安装
### 注意安装python
### 推荐使用官方安装包
1. 下载 Python：
2. 访问 Python 官网。
3. 下载适合你自己系统的最新版本。
安装：
4. 双击下载的安装包文件并按照安装步骤进行。
### 安装包
```
pip install moviepy # 在终端中运行
pip install opencv-python # 在终端中运行
```
## Lnto-mp4.py的运行
```python
.......
#Into-mp4.py
# 图像文件夹路径  
image_folder = 'path/to/your/image_folder/'  
# 输出视频文件名  
output_video = 'f1.mp4'  
# 音频文件路径  
audio_file = 'path/to/your/audio_file.mp3'  # 或 .wav 文件
# 设置限制的视频时长（单位：秒）  
max_duration = 26  # 限制视频时长为26秒  
# 设置帧率为60
fps_a = 60
......
```
