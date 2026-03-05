import React, { useState, useRef, useEffect } from "react";

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    const videoSources = ["/images/1.mp4", "/images/2.mp4"];
    const videoSource = videoSources[currentVideoIndex];

    const handleVideoLoad = () => {
        setIsLoading(false);
        setError(null);
    };

    const handleVideoError = () => {
        setError("Failed to load video");
        setIsLoading(false);
    };

    const handleVideoEnded = () => {
        // Move to next video when current video ends
        setCurrentVideoIndex((prevIndex) => 
            (prevIndex + 1) % videoSources.length
        );
    };

    const playVideo = async () => {
        try {
            setIsLoading(true);
            await videoRef.current.play();
            setIsLoading(false);
        } catch (err) {
            console.log("Autoplay prevented:", err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            playVideo();
        }
    }, [currentVideoIndex]); // Re-run when video index changes

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
                </div>
            )}

            <video
                ref={videoRef}
                controls
                playsInline
                muted
                autoPlay
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                onEnded={handleVideoEnded}
                preload="auto"
                style={{
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
