import React, { useState, useRef, useEffect } from "react";

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);

    const videoSource = "/images/1.mp4";

    const handleVideoLoad = () => {
        setIsLoading(false);
        setError(null);
    };

    const handleVideoError = () => {
        setError("Failed to load video");
        setIsLoading(false);
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
    }, []);

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
                loop // 🔄 makes it loop
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
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
