import React, { useState, useRef, useEffect } from 'react';
import RegisterFormComponents from '../components/register-form-component';
import TrainingVideoPlayerComponent from '../components/training-video-player-component';

export default function AcceptableUseSection({ type }) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRefs = useRef([]);

    const videoSources = [
        "/images/EO - Compliance Training -  Acceptable Use Policy.mp4",
    ];

    const handleVideoEnd = () => {
        setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    };

    useEffect(() => {
        if (formSubmitted && videoRefs.current[currentVideo]) {
            videoRefs.current[currentVideo].play();
        }
    }, [currentVideo, formSubmitted]);

    // Callback to be passed to the form component
    const handleFormSubmit = () => {
        setFormSubmitted(true);
    };

    return (
        <>
            <div>
                {!formSubmitted && (
                    <RegisterFormComponents
                        type={type}
                        onSubmitSuccess={handleFormSubmit}
                    />
                )}
            </div>

            {formSubmitted && (
                <TrainingVideoPlayerComponent
                    videoSrc={videoSources}
                    link="https://forms.gle/nMgfsfszE1gTQZku7"
                />
            )}
        </>
    );
}
