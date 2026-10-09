"use client";

import type { COBEOptions } from "cobe"
import { Globe } from "@/components/ui/globe-feature-section"
import { cn } from "@/lib/utils"

/**
 * BookingBee-themed globe for the "Trusted by Beauty Businesses" section.
 * Same component as globe-feature-section, restyled: lavender globe,
 * violet land dots, bee-yellow markers on the salon cities, soft purple glow.
 */
export const BOOKINGBEE_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: Math.PI - ((-98 * Math.PI) / 180 - Math.PI / 2), // start with the U.S. facing forward
  theta: 0.32,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.25,
  baseColor: [0.88, 0.84, 0.99],   // lavender  (#E0D6FC)
  markerColor: [1, 205 / 255, 0],  // bee yellow (#FFCD00)
  glowColor: [0.91, 0.87, 1],      // soft violet glow
  markers: [
    { location: [47.6062, -122.3321], size: 0.06 }, // Seattle, WA
    { location: [34.0522, -118.2437], size: 0.08 }, // Los Angeles, CA
    { location: [39.7392, -104.9903], size: 0.06 }, // Denver, CO
    { location: [41.8781, -87.6298], size: 0.07 },  // Chicago, IL
    { location: [40.7128, -74.006], size: 0.1 },    // New York, NY
    { location: [40.0583, -74.4057], size: 0.05 },  // New Jersey
    { location: [33.4484, -112.074], size: 0.06 },  // Phoenix, AZ
    { location: [32.7767, -96.797], size: 0.07 },   // Dallas, TX
    { location: [33.749, -84.388], size: 0.07 },    // Atlanta, GA
    { location: [25.7617, -80.1918], size: 0.07 },  // Miami, FL
    { location: [28.5383, -81.3792], size: 0.07 },  // Orlando, FL
  ],
}

/** Drop into the right column of the Trusted section (parent must be `relative`). */
export function BookingBeeGlobe({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-auto absolute -right-[60px] -top-6 h-[660px] w-[660px]", className)}>
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(111,66,193,.16)_0%,rgba(142,197,252,.10)_45%,transparent_70%)] blur-[20px]" />
      <Globe config={BOOKINGBEE_GLOBE_CONFIG} className="max-w-none" />
    </div>
  )
}
