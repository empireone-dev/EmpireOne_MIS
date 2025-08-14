import React, { useState, useRef, useEffect } from 'react';

export default function Page() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef([]);

  const videoSources = [
    // "/images/Logo(Horizontal).mp4",
    // "/images/welcome.mp4",
    "/images/1.mp4",
    "/images/2.mp4",
    "/images/3.mp4",
    "/images/4.mp4",
    "/images/5.mp4",
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
    setCurrentVideo((prev) => (prev + 1) % videoSources.length); // Go to next video or loop back to the first
  };

  useEffect(() => {
    videoRefs.current[currentVideo].play();
  }, [currentVideo]);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {videoSources.map((src, index) => (
        <video
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          controls
          onEnded={handleVideoEnd}
          loop // Adding the loop attribute to ensure the video loops
          style={{
            display: currentVideo === index ? 'block' : 'none',
            width: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  );
}
