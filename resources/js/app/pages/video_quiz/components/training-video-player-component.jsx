import React, { useState, useRef } from "react";
import ModalQuiz from "../../_components/modal_quiz";

export default function TrainingVideoPlayerComponent({ videoSrc, link }) {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [showQuizLink, setShowQuizLink] = useState(false);
    const videoRefs = useRef([]);

    const handleVideoEnd = () => {
        if (currentVideo === videoSrc.length - 1) {
            setShowQuizLink(true);
        } else {
            setCurrentVideo((prev) => prev + 1);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "skyblue",
                padding: "40px",
            }}
        >
            {!showQuizLink &&
                videoSrc.map((src, index) => (
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

            <ModalQuiz show={showQuizLink} static onClose={() => {}}>
                <div className="mt-6 text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        Training Complete
                    </h2>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-md bg-green-600 px-8 py-4 text-white font-medium hover:bg-green-500 transition"
                    >
                        Proceed to Quiz
                    </a>
                </div>
            </ModalQuiz>
        </div>
    );
}
