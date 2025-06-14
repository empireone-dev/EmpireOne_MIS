import React, { useState, useRef, useEffect } from "react";

export default function TrainingVideoPlayerComponent({ videoSrc, link }) {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [showQuizLink, setShowQuizLink] = useState(false);
    const videoRefs = useRef([]);

    const handleVideoEnd = () => {
        if (currentVideo === videoSrc.length - 1) {
            // Last video ended
            setShowQuizLink(true);
        } else {
            setCurrentVideo((prev) => prev + 1);
        }
    };

    useEffect(() => {
        videoRefs.current[currentVideo]?.play();
    }, [currentVideo]);

    return (
        <div style={{ width: "100%", height: "auto", backgroundColor: "skyblue", padding: "40px" }}>
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
                        boxSizing: "border-box",
                    }}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ))}

            {showQuizLink && (
                <div className="mt-6 text-center">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-md bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-500 transition"
                    >
                        Proceed to Quiz
                    </a>
                </div>
            )}
        </div>
    );
}
