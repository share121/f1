import os

from moviepy.editor import AudioFileClip, ImageSequenceClip

# 图像文件夹路径  
image_folder = ''  
# 输出视频文件名  
output_video = 'f1.mp4'  
# 音频文件路径  
audio_file = 'src/Turn-into-mp4/need/audio.mp3'  # 或 .wav 文件
# 设置限制的视频时长（单位：秒）  
max_duration = 26  # 限制视频时长为26秒  
# 设置帧率为60
fps_a = 60

# 获取所有图像文件  
images = [img for img in os.listdir(image_folder) if img.endswith(".jpg") or img.endswith(".png")]  
# 对图像进行排序
images.sort()  

# 创建视频剪辑  
clip = ImageSequenceClip([os.path.join(image_folder, img) for img in images], fps=fps_a)    

# 添加音频  
audio = AudioFileClip(audio_file)  
video = clip.set_audio(audio)  

# 限制视频时长  
if video.duration > max_duration:  
    video = video.subclip(0, max_duration)  

# 输出视频文件  
video.write_videofile(output_video, codec='libx264')  

print("视频与音频已成功合成，视频时长限制为{}秒！".format(max_duration))