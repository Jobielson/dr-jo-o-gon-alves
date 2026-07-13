import React from 'react';

interface JGLogoProps {
  className?: string;
  size?: number | string;
}

export default function JGLogo({ className = '', size = '100%' }: JGLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Soft realistic drop shadow for the 3D medallion */}
        <filter id="medallion-shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#0c0704" floodOpacity="0.18" />
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0c0704" floodOpacity="0.08" />
        </filter>

        {/* Outer metallic rim of the white medallion */}
        <linearGradient id="medallion-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#e2dfda" />
          <stop offset="55%" stopColor="#c8c5bf" />
          <stop offset="100%" stopColor="#96928b" />
        </linearGradient>

        {/* Soft 3D spherical gradient for the medallion surface */}
        <radialGradient id="medallion-surface" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f3f1ed" />
          <stop offset="85%" stopColor="#e5e2db" />
          <stop offset="100%" stopColor="#d1cdc4" />
        </radialGradient>

        {/* Subtle inner ambient shadow inside the medallion's rim */}
        <filter id="medallion-inner-bevel">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="3" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="#000000" floodOpacity="0.15" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>

        {/* Luxury Chocolate Bronze Gradient for the JG Monogram */}
        <linearGradient id="jg-chocolate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c160c" />
          <stop offset="25%" stopColor="#3d2012" />
          <stop offset="50%" stopColor="#54311c" />
          <stop offset="75%" stopColor="#3d2012" />
          <stop offset="100%" stopColor="#1e0e07" />
        </linearGradient>

        {/* Highlight sheen gradient overlay for 3D bevel edges */}
        <linearGradient id="jg-highlight-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.15} />
          <stop offset="30%" stopColor="#ffffff" stopOpacity={0.4} />
          <stop offset="50%" stopColor="#ffe4c4" stopOpacity={0.3} />
          <stop offset="70%" stopColor="#ffffff" stopOpacity={0.1} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0} />
        </linearGradient>

        {/* Extreme High-Fidelity 3D Bevel Filter for Monogram */}
        <filter id="monogram-3d" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
          
          <feSpecularLighting 
            in="blur" 
            surfaceScale="4.5" 
            specularConstant="1.5" 
            specularExponent="28" 
            lighting-color="#ffdcb3" 
            result="specular"
          >
            <feDistantLight azimuth="125" elevation="52" />
          </feSpecularLighting>
          
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="spec-masked" />
          
          <feDiffuseLighting 
            in="blur" 
            surfaceScale="4.5" 
            diffuseConstant="1.25" 
            lighting-color="#ffffff" 
            result="diffuse"
          >
            <feDistantLight azimuth="125" elevation="52" />
          </feDiffuseLighting>
          
          <feBlend mode="multiply" in="SourceGraphic" in2="diffuse" result="shaded" />
          <feBlend mode="screen" in="spec-masked" in2="shaded" result="beveled" />
          
          {/* Subtle drop shadow under the raised letters onto the medallion */}
          <feDropShadow dx="1.5" dy="6" stdDeviation="4.5" floodColor="#1a0b04" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* 1. Medallion Base Plate & Shadow */}
      <circle 
        cx="250" 
        cy="250" 
        r="224" 
        fill="url(#medallion-surface)" 
        stroke="url(#medallion-rim-grad)" 
        strokeWidth="4" 
        filter="url(#medallion-shadow)" 
      />

      {/* 2. Soft Inner Shading for the rim edge to give depth */}
      <circle 
        cx="250" 
        cy="250" 
        r="221" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="2" 
        opacity="0.8" 
      />
      <circle 
        cx="250" 
        cy="250" 
        r="219" 
        fill="none" 
        stroke="#000000" 
        strokeWidth="1.5" 
        opacity="0.04" 
      />

      {/* 3. The 3D JG Monogram Group */}
      <g filter="url(#monogram-3d)">
        {/* Dark underlying base stroke to define deep crisp bevel boundaries */}
        <g stroke="#1a0a04" strokeWidth="21" strokeLinejoin="round" fill="none">
          {/* J Hook (Bottom Left) */}
          <path d="M 92,282 C 92,332 126,357 212,332" strokeLinecap="round" />
          
          {/* Crescent Left Hugging curve */}
          <path d="M 197,175 C 177,205 177,285 215,312" strokeLinecap="round" />
          
          {/* J Vertical Stem */}
          <path d="M 226,115 L 226,300" strokeLinecap="butt" />
          
          {/* G Outer Big Curve */}
          <path d="M 245,135 C 280,120 405,120 405,230 C 405,335 300,370 215,348" strokeLinecap="round" />
          
          {/* G Horizontal Crossbar */}
          <path d="M 305,232 L 413,232" strokeLinecap="butt" />
        </g>

        {/* Rich main metallic chocolate bronze core stroke */}
        <g stroke="url(#jg-chocolate-grad)" strokeWidth="18" strokeLinejoin="round" fill="none">
          {/* J Hook (Bottom Left) */}
          <path d="M 92,282 C 92,332 126,357 212,332" strokeLinecap="round" />
          
          {/* Crescent Left Hugging curve */}
          <path d="M 197,175 C 177,205 177,285 215,312" strokeLinecap="round" />
          
          {/* J Vertical Stem */}
          <path d="M 226,115 L 226,300" strokeLinecap="butt" />
          
          {/* G Outer Big Curve */}
          <path d="M 245,135 C 280,120 405,120 405,230 C 405,335 300,370 215,348" strokeLinecap="round" />
          
          {/* G Horizontal Crossbar */}
          <path d="M 305,232 L 413,232" strokeLinecap="butt" />
        </g>

        {/* Dynamic bright 3D edge sheen overlay for high-end luxury look */}
        <g stroke="url(#jg-highlight-sheen)" strokeWidth="3" strokeLinejoin="round" fill="none" opacity="0.65">
          {/* J Hook */}
          <path d="M 93,281 C 93,330 127,355 211,330" strokeLinecap="round" />
          
          {/* Crescent */}
          <path d="M 198,174 C 178,204 178,284 216,311" strokeLinecap="round" />
          
          {/* Stem */}
          <path d="M 227,114 L 227,299" strokeLinecap="butt" />
          
          {/* G Big Curve */}
          <path d="M 246,134 C 281,119 404,119 404,229 C 404,334 301,368 216,346" strokeLinecap="round" />
          
          {/* G Crossbar */}
          <path d="M 306,231 L 412,231" strokeLinecap="butt" />
        </g>
      </g>
    </svg>
  );
}
