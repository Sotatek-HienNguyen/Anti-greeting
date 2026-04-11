import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

const ShadowingPlayer = forwardRef(({ videoId, onTimeUpdate }, ref) => {
  const playerRef = useRef(null);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  // Update ref when callback changes
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  useImperativeHandle(ref, () => ({
    pauseVideo: () => {
      if (playerRef.current && playerRef.current.pauseVideo) playerRef.current.pauseVideo();
    },
    playVideo: () => {
      if (playerRef.current && playerRef.current.playVideo) playerRef.current.playVideo();
    },
    seekTo: (seconds) => {
      if (playerRef.current && playerRef.current.seekTo) playerRef.current.seekTo(seconds, true);
    },
    getPlayerState: () => {
      return playerRef.current?.getPlayerState ? playerRef.current.getPlayerState() : -1;
    }
  }), []);

  useEffect(() => {
    // 1. Load the YouTube IFrame Player API code asynchronously.
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const createPlayer = () => {
      if (playerRef.current) return;
      
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          'autoplay': 1,
          'controls': 1,
          'rel': 0,
          'enablejsapi': 1
        },
        events: {
          'onReady': onPlayerReady,
        }
      });
    };

    window.onYouTubeIframeAPIReady = createPlayer;

    if (window.YT && window.YT.Player) {
      createPlayer();
    }

    let interval;

    function onPlayerReady(event) {
      interval = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          onTimeUpdateRef.current(currentTime);
        }
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]); // ONlY re-run if videoId changes

  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', background: '#000' }}>
      <div id="youtube-player" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
    </div>
  );
});

export default ShadowingPlayer;
