"use client";

import React, { useState, useEffect, useMemo } from "react";
import AntiPhishingSection from "./sections/anti-phishing-section";
import AntiSexualSection from "./sections/anti-sexual-section";
import CleanDiskSection from "./sections/clean-disk-section";
import IsmsAwarenessSection from "./sections/isms-awareness-section";
import OccupationalSafetySection from "./sections/occupational-safety-section";
import AcceptableUseSection from "./sections/acceptable-use-section";
import store from "@/app/store/store";
import { get_video_quiz_thunk } from "./redux/video-quiz-thunk";

export default function Page() {
    const [type, setType] = useState(null);

    useEffect(() => {
        store.dispatch(get_video_quiz_thunk())
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pathType = window.location.pathname.split('/')[2];
            setType(pathType);
        }
    }, []);

    const SectionComponent = useMemo(() => {
        switch (type) {
            case "AcceptableUsePolicy":
                return <AcceptableUseSection type={type} />;
            case "AntiPhishing":
                return <AntiPhishingSection type={type} />;
            case "AntiSexual":
                return <AntiSexualSection type={type} />;
            case "CleanDisk":
                return <CleanDiskSection type={type} />;
            case "IsmsAwareness":
                return <IsmsAwarenessSection type={type} />;
            case "OccupationalSafety":
                return <OccupationalSafetySection type={type} />;
            default:
                return <p>Invalid section type.</p>;
        }
    }, [type]);

    return (
        <div>
            {SectionComponent}
        </div>
    );
}
