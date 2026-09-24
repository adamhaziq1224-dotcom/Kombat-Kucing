import React from 'react';
import { Volume2, VolumeX, Menu, Settings } from 'lucide-react';
import { toggleAudioMute, getAudioMuted, playSelectSound } from '../utils/audio';

interface CrtOverlayProps {
  children: React.ReactNode;
  activePhaseText: string;
}

export const CrtOverlay: React.FC<CrtOverlayProps> = ({
  children,
  activePhaseText
}) => {
  const [muted, setMuted] = React.useState(getAudioMuted());

  const handleToggleMute = () => {
    const isNowMuted = toggleAudioMute();
    setMuted(isNowMuted);
    if (!isNowMuted) playSelectSound();
  };

  return (
    <div className="relative h-[100dvh] w-full bg-slate-950 flex flex-col overflow-hidden text-slate-100 font-sans landscape-app">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full h-full max-w-full mx-auto flex flex-col z-10">
        
        {/* Dynamic App Content */}
        <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden crt-screen">
          {/* Scanlines Effect Overlay (Subtle) */}
          <div className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-20 sm:opacity-40 mix-blend-multiply" />

          {/* CRT Subtle Vignette */}
          <div className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_70%,rgba(0,0,0,0.4)_100%)]" />

          {/* Render children with scrolling support */}
          <div className="relative z-10 flex-1 flex flex-col overflow-y-auto min-h-0 bg-transparent">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};
