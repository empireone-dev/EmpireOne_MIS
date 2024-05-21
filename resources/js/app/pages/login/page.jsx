import React from 'react';
import LoginFormSection from './sections/login-form-section';
import videoBackground from './../../../../../public/images/design.mp4';

export default function Page() {
  return (
    <div className="relative w-screen h-screen">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10">
          <LoginFormSection />
        </div>
      </div>
    </div>
  );
}
