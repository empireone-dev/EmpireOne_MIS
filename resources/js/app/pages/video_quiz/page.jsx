"use client";

import React, { useState } from "react";
import AntiPhishingSection from "./sections/anti-phishing-section";
import AntiSexualSection from "./sections/anti-sexual-section";
import CleanDiskSection from "./sections/clean-disk-section";
import IsmsAwarenessSection from "./sections/isms-awareness-section";
import OccupationalSafetySection from "./sections/occupational-safety-section";
import AcceptableUseSection from "./sections/acceptable-use-section";
import RegisterFormComponents from "./components/register-form-component";

export default function Page() {
    const [isRegistered, setIsRegistered] = useState(false);
    const type = window?.location?.pathname.split('/')[2];

    const handleRegisterSuccess = () => {
        setIsRegistered(true);
    };

    return (
        <div>
            <>
                <AcceptableUseSection type={type} />
                <AntiPhishingSection type={type} />
                <AntiSexualSection type={type} />
                <CleanDiskSection type={type} />
                <IsmsAwarenessSection type={type} />
                <OccupationalSafetySection type={type} />
            </>
        </div>
    );
}
