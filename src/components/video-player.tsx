import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

interface HLSPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ src, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | null = null;

    if (videoRef.current) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }
    }

    return () => {
      if (videoRef.current) {
        const video = videoRef.current;
        video.pause();
        video.removeAttribute("src");
        if (hls) {
          hls.destroy();
        }
      }
    };
  }, [src]);

  return (
    <video ref={videoRef} controls {...props} muted>
      Your browser does not support the video tag.
    </video>
  );
};

export default HLSPlayer;
