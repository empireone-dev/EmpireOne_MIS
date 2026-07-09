import React from "react";

export default function SssSection() {
    return (
        <>
            <div>
                <iframe
                    width="100%"
                    height="800"
                    src="/images/sss.mp4"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="px-4"
                ></iframe>
            </div>
        </>
    );
}
