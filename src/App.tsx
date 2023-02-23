import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
// const faceapi = require('face-api.js');
import * as faceapi from 'face-api.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hackathon</p>
        <Video />
      </header>
    </div>
  );
}

const videoSize = { width: 500, height: 400 }

declare const navigator:any

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playVideo = () => {
    console.log('playVideo')
    const { current: video } = videoRef;
    if(video) {
      console.log('video.play()')
      video.play();
    }
  }

  const loadModels = () => Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/'),
    faceapi.nets.faceExpressionNet.loadFromUri('/'),
  ])

  const enableDetection = async () => {
    console.log('enableDetection')
    console.log('loadModels start')
    await loadModels();
    console.log('loadModels end')
    const { current: canvas } = canvasRef;
    const { current: video } = videoRef;

    if(video && canvas) {
      const detectAndRender = async () => {
        console.log('detectAndRender before detections')

        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions()

        console.log('detectAndRender after detections')
        
        const resizedResults = faceapi.resizeResults(detections, videoSize)
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedResults)
      }

      setInterval(detectAndRender, 200)
    }

      // console.log('add event listener')
      // video.addEventListener('play', () => {
      //   console.log('play listener')
      //   setInterval(detectAndRender, 1000)
      // })
  }

  const startWebcam = async (event: any) => {
    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      
      if(videoRef.current) videoRef.current.srcObject = userMediaStream
      else throw new Error('no video element for videoRef');
      playVideo()
    }
    catch(e) {
      console.error(e);
    }
  };

  return (
    <>
      <div>
        <video ref={videoRef} {...videoSize} autoPlay={true} muted={true}></video>
        <canvas ref={canvasRef} {...videoSize} />
      </div>
      <p>v2</p>
      <p>enjoy</p>
      <button onClick={startWebcam}>start webcam</button>
      <button onClick={enableDetection}>enable detection</button>
      {/* <button onClick={playVideo}>play video</button> */}
    </>
  )
}

export default App;
