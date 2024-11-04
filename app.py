from flask import Flask, render_template, request
from utils import AudioTransform, TextTransform

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process/<type>', methods=['POST'])
def process(type):
    if type == 'text':
        text, emotion_type, voice_gender_type = request.json.get('text'), request.json.get('emotion_type'), request.json.get('voice_gender_type')
        processed_audio = TextTransform(text=text, emotion_type=emotion_type, voice_gender_type=voice_gender_type)
    elif type == 'audio':
        audio, emotion_type, voice_gender_type = request.files.get('audio'), request.json.get('emotion_type'), request.json.get('voice_gender_type')
        processed_audio = AudioTransform(audio=audio, emotion_type=emotion_type, voice_gender_type=voice_gender_type)
    else:
        return {'result': None, 'msg': 'Invalid Type'}
    return {'result': processed_audio, 'msg': 'Emotionification Complete'}

if __name__ == '__main__':
    app.run(debug=True)