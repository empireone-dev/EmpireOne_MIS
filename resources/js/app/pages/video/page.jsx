import React, { useState, useRef, useEffect } from "react";

export default function Page() {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoRefs = useRef([]);

    const videoSources = [
        // "/images/Logo(Horizontal).mp4",
        "/images/DAY 2.mp4",
        // "/images/1.mp4",
        // "/images/2.mp4",
        // "/images/3.mp4",
        // "/images/4.mp4",
        // "/images/5.mp4",
        // "/images/6.mp4",
        // "/images/7.mp4",
        // "/images/8.mp4",
        // "/images/9.mp4",
        // "/images/10.mp4",
        // "/images/11.mp4",
        // "/images/12.mp4",
        // "/images/13.mp4",
        // "/images/14.mp4",
        // "/images/15.mp4",
        // "/images/16.mp4",
        // "/images/17.mp4",
        // "/images/18.mp4",
        // "/images/19.mp4",
        // "/images/20.mp4",
        // "/images/21.mp4",
        // "/images/22.mp4",
        // "/images/23.mp4",
        // "/images/24.mp4",
        // "/images/25.mp4",
        // "/images/26.mp4",
        // "/images/27.mp4",
        // "/images/28.mp4",
        // "/images/29.mp4",
    ];

    const handleVideoEnd = () => {
        setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    };

    const handleVideoLoad = () => {
        setIsLoading(false);
        setError(null);
    };

    const handleVideoError = () => {
        setError("Failed to load video");
        setIsLoading(false);
    };

    const playVideo = async (videoElement) => {
        try {
            setIsLoading(true);
            await videoElement.play();
            setIsLoading(false);
        } catch (error) {
            console.log("Autoplay prevented:", error);
            setIsLoading(false);
            // Video will be ready to play when user clicks play
        }
    };

    useEffect(() => {
        const currentVideoElement = videoRefs.current[currentVideo];
        if (currentVideoElement) {
            playVideo(currentVideoElement);
        }
    }, [currentVideo]);

    return (
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
                overflow: "hidden",
            }}
        >
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "18px",
                        zIndex: 10,
                    }}
                >
                    Loading video...
                </div>
            )}
            
            {error && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "red",
                        fontSize: "18px",
                        textAlign: "center",
                        zIndex: 10,
                    }}
                >
                    {error}
                    <br />
                    <button
                        onClick={() => {
                            setError(null);
                            setCurrentVideo((prev) => (prev + 1) % videoSources.length);
                        }}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            backgroundColor: "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Try Next Video
                    </button>
                </div>
            )}

            {videoSources.map((src, index) => (
                <video
                    key={index}
                    ref={(el) => (videoRefs.current[index] = el)}
                    controls
                    playsInline
                    muted
                    autoPlay={currentVideo === index}
                    onEnded={handleVideoEnd}
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    preload={currentVideo === index ? "auto" : "none"}
                    style={{
                        display: currentVideo === index ? "block" : "none",
                        width: "100vw",
                        height: "100vh",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ))}
            
            {/* Video counter */}
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    zIndex: 10,
                }}
            >
                {currentVideo + 1} / {videoSources.length}
            </div>
        </div>
    );
}
