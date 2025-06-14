// components/TrainingVideoPlayer.js
import React, { useState, useRef, useEffect } from "react";

export default function TrainingVideoPlayerComponent({ videoSrc }) {
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRefs = useRef([]);

    const handleVideoEnd = () => {
        setCurrentVideo((prev) => (prev + 1) % videoSrc.length);
    };

    useEffect(() => {
        videoRefs.current[currentVideo]?.play();
    }, [currentVideo]);

    return (
        <div style={{ width: "100%", height: "auto", backgroundColor: "skyblue" }}>
            {videoSrc.map((src, index) => (
                <video
                    key={index}
                    ref={(el) => (videoRefs.current[index] = el)}
                    controls
                    onEnded={handleVideoEnd}
                    style={{
                        display: currentVideo === index ? "block" : "none",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "40px",
                        boxSizing: "border-box",
                    }}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ))}
        </div>
    );
}
