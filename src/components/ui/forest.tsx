"use client"
import React from 'react'

export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={className}
      src="https://assets.21st.dev/ascii-recipes/videos/user_3GU9lDnevaFSdflC11GXo5RtDNq/4cb0df2f-41cd-4ae9-ae6e-a1aa2dcc5a8e.mp4"
      poster="https://assets.21st.dev/ascii-recipes/thumbnails/user_3GU9lDnevaFSdflC11GXo5RtDNq/f9062628-9f19-4141-a423-bd8346585b37.png"
      autoPlay
      loop
      muted
      playsInline
      aria-label="Forest — animated ASCII art"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  )
}
