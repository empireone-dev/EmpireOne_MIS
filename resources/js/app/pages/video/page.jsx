import React, { useState, useRef, useEffect } from 'react';

export default function Page() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef([]);
  const video_item = window.location.pathname.split('/')[2]
  const videoSources = [
    `/images/${video_item}.mp4`,
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
