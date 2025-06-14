import React, { useState, useRef, useEffect } from 'react';

export default function VideoSection() {
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRefs = useRef([]);

    const videoSources = [
        "/images/EO - Compliance Training -  Acceptable Use Policy.mp4",
        "/images/EO - Compliance Training -  Anti-Sexual Harassment & Workplace Misconduct Policy.mp4",
        "/images/EO - Compliance Training -  Clean Desk and Clear Screen policy.mp4",
        "/images/EO - Compliance Training -  Occupational Safety and Health (OSH) Policy Training.mp4",
        "/images/EO - Compliance Training - Anti-Phishing.mp4",
        "/images/EO - Compliance Training - ISMS Awareness.mp4",
        // "/images/2.mp4",
        // "/images/3.mp4"
    ];

    const handleVideoEnd = () => {
        setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    };

    useEffect(() => {
        videoRefs.current[currentVideo].play();
    }, [currentVideo]);

    return (
        <div style={{
            width: '100%', height: 'auto',
            backgroundColor: 'skyblue'
        }}>
            {videoSources.map((src, index) => (
                <video
                    key={index}
                    ref={(el) => (videoRefs.current[index] = el)}
                    controls
                    onEnded={handleVideoEnd}
                    style={{
                        display: currentVideo === index ? 'block' : 'none',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '40px',
                        boxSizing: 'border-box',
                    }}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

            ))}
        </div>
    );
}
