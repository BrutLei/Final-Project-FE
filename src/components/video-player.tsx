import React, { useRef, useEffect } from "react";
import Hls from "hls.js";
import { Lock } from "lucide-react";

interface HLSPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  isLocked: boolean;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ src, isLocked, ...props }) => {
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
    <div className=" relative aspect-video">
      {!isLocked && (
        <video
          ref={videoRef}
          controls
          {...props}
          width="100%"
          height="100%"
          muted
          className="absolute inset-0 flex items-center justify-center bg-slate-800 text-secondary"
        >
          Your browser does not support the video tag.
        </video>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-secondary">
          <Lock className="w-8 h-8 mr-2" />
          <p>This chapter is locked</p>
        </div>
      )}
    </div>
  );
};

export default HLSPlayer;
