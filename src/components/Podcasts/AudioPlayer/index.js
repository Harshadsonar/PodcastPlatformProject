import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function AudioPlayer({ audioSrc, image }) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef();

  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const togglePlay = () => {
    if (isPlaying) setIsPlaying(false);
    else setIsPlaying(true);
  };

  const toggleMute = () => {
    if (isMute) setIsMute(false);
    else setIsMute(true);
  };

  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    audioRef.current.playbackRate = speed;
  };

  // const increaseSpeed = () => {
  //   if(playbackSpeed < 10) {
  //     changeSpeed((playbackSpeed + 0.1).toFixed(1));
  //   }
  // };

  // const decreaseSpeed = () => {
  //   if(playbackSpeed > 0.1) {
  //     changeSpeed((playbackSpeed - 0.1).toFixed(1));
  //   }
  // };

  const formateTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetaData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  const handleBackwardBtn = () => {
    const newCurrentTime = currentTime - 10;
    setCurrentTime(newCurrentTime);
    audioRef.current.currentTime = newCurrentTime;
  };
  const handleForwardBtn = () => {
    const newCurrentTime = currentTime + 10;
    setCurrentTime(newCurrentTime);
    audioRef.current.currentTime = newCurrentTime;
  };

  return (
    <div className="audio-player">
      <div className="player">
        <div className="display-image-player">
        <img src={image} alt="Audio-Player" />
        </div>
      <audio ref={audioRef} src={audioSrc} />
      <div className="duration-flex">
        <p>{formateTime(currentTime)}</p>
        <input
          type="range"
          max={duration}
          value={currentTime}
          onChange={handleDuration}
          step={0.01}
          className="duration-range"
        />
        <p>-{formateTime(duration - currentTime)}</p>
      </div>
      <div className="speed-control">
            <select
            value={playbackSpeed}
            onChange={(e) => changeSpeed(parseFloat(e.target.value))}
            > 
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
            {/* <button className="speed-control-btn" onClick={increaseSpeed}>+</button>
            <p className="speed-label">{playbackSpeed}x</p>
            <button className="speed-control-btn" onClick={decreaseSpeed}>-</button> */}
          </div>
      </div>
        <div className="player-controls">
        <div className="control-btns">
          <p className="backward-btn" onClick={handleBackwardBtn}>
            -10s
          </p>
          <p onClick={togglePlay} className="play-pause-btn">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </p>
          <p className="forward-btn" onClick={handleForwardBtn}>
            +10s
          </p>
        </div>
        <div className="volume-flex"> 
        <p className="mute-unmute-btn" onClick={toggleMute}>
          {isMute ? <FaVolumeMute /> : <FaVolumeUp />}
        </p>
        <input
          type="range"
          value={volume}
          max={1}
          min={0}
          step={0.01}
          onChange={handleVolume}
          className="volume-range"
        />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
