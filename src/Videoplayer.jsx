import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from "react";
import video from './assets/video.mp4'

function Videoplayer() {
  
  const vidRef = useRef(null)
  const [src, setSrc] = useState("");
  const [playing, setPlaying] = useState(false)
  const [screen, setScreen] = useState('50%')
  const [size, setSize] = useState(false)
  const [videoTime, setVideoTime] = useState(0)
  const [currentTime,setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.5)

  let vid = document.getElementById('video')



  const handleChange = (event) => {
    try {
      const file = event.target.files[0];
      setSrc(URL.createObjectURL(file));
    } catch (error) {
      console.log(error);
    }
}

  const handlePlay = () => {
    if (playing === false && src!= '') {
        vidRef.current.play()
        setPlaying(true)
        setVideoTime(vid.duration)
    }
    else if (playing === true && src!= '') {
        vidRef.current.pause()
        setPlaying(false)
    }
}

const fullScrn = () => {
  vid ? (vid.requestFullscreen()) : null;
}

const handleReduce = () => {
  setVolume((volume >=0.1)? volume-0.1: 0)
  vidRef.current.volume = volume
}

const handleIncrease = () => {
  setVolume((volume <=0.9)? volume+0.1 : 0)
  vidRef.current.volume = volume 
}

    window.setInterval(function () {
        if (playing == true && src!= '') {
          setCurrentTime(vidRef.current.currentTime);
        setProgress((vidRef.current.currentTime / videoTime) * 100);
        }
    }, 1000);


  return (
    <>
      <div className='col-9 mx-auto' id='body'> <br />
          <input type="file" onChange={handleChange} name="" id="" z /> <br /> <br /> 
          <div className='p-2 bg-secondary'>
              <video id='video' ref={vidRef} src={src} style={{width: screen}} loop>
              Your browser get problem        
              </video> <br />
              <div className="timecontrols">
                      <p className="controlsTime">{Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}</p>
                  <div className="time_progressbarContainer">
                      <div style={{ width: `${progress}%` }} className="time_progressBar"></div>
                  </div>
                      <p className="controlsTime">{Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}</p>
              </div>
          </div> 
         
          <div>
              {playing ? ( <button onClick={handlePlay} className='btn btn-secondary m-1 bi bi-pause-fill'>
                          Pause
                          </button>) :  
                          <button onClick={handlePlay} className='btn btn-secondary m-1 bi bi-play-fill'>
                              Play
                          </button>
              }
              
              <button onClick={handleIncrease} className='btn btn-secondary m-1'>Vol++</button>
              <button onClick={handleReduce} className='btn btn-secondary m-1'>Vol--</button>

              {size ? (<button onClick={fullScrn} className='btn btn-secondary m-1 bi bi-fullscreen-exit'>
                        </button>) : 
                      (<button onClick={fullScrn} className='btn btn-secondary m-1 bi bi-fullscreen'>
                        </button>)}
          </div>
      </div>
    </>
  );

}
   
export default Videoplayer;
