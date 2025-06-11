"use client";

import React, { useState } from "react";
import VideoSection from "./sections/video-section";
import RegisterSection from "./sections/register-section";

export default function Page() {
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegisterSuccess = () => {
        setIsRegistered(true);
    };

    return (
        <div>
            {!isRegistered ? (
                <RegisterSection onRegisterSuccess={handleRegisterSuccess} />
            ) : (
                <VideoSection />
            )}
        </div>
    );
}
