import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

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

declare const navigator:any

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playVideo = (event: any) => {
    console.log(1)
    navigator.mediaDevices.getUserMedia(
      { video: {}},
      (stream:any) => {
        console.log(2)
        console.log({videoRef, stream})
        // if(videoRef.current) videoRef.current.srcObject = stream
      },
      (err:any) => {
        console.log(3)
        console.error(err)
      }
    )
    // console.log(videoRef.current)
    // videoRef.current && videoRef.current.play();
  };

  return (
    <>
      <video ref={videoRef} width="500" height="400" autoPlay={true} muted={true}></video> 
      <button onClick={playVideo}>start webcam</button>
    </>
  )
}

export default App;
