"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const DiamondIcon = ({ shape, className = "w-30 h-30" }: { shape: string; className?: string }) => {
  const shapeMap: Record<string, string> = {
    round: "Round",
    princess: "Princess",
    cushion: "Square Cushion",
    oval: "Oval",
    emerald: "Emerald",
    pear: "Pear",
    marquise: "Marquise",
    radiant: "Radiant",
    asscher: "Asscher",
    heart: "Heart",
  }

  return (
    <Image
      src={`/diamonds/${shape}.svg`}
      alt={`${shapeMap[shape] || shape} cut diamond shape icon`}
      width={240}
      height={240}
      className={className}
      priority
    />
  )
}

const DIAMOND_SHAPES = [
  { id: "round", name: "Round" },
  { id: "princess", name: "Princess" },
  { id: "cushion", name: "Square Cushion" },
  { id: "oval", name: "Oval" },
  { id: "emerald", name: "Emerald" },
  { id: "pear", name: "Pear" },
  { id: "marquise", name: "Marquise" },
  { id: "radiant", name: "Radiant" },
  { id: "asscher", name: "Asscher" },
  { id: "heart", name: "Heart" },
]

const PRESET_CARATS: Record<string, number[]> = {
  round: [0.1, 0.5, 1.0, 2.5, 5.0, 8.0],
  princess: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
  cushion: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
  oval: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
  emerald: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
  pear: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
  marquise: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
  radiant: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
  asscher: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
  heart: [0.25, 0.75, 1.5, 3.0, 5.0, 8.0],
}

// Format: { shape: { carat: { width: x, length: y } } }
const SIZE_DATA: Record<string, Record<number, { width: number; length?: number }>> = {
  round: {
    0.0011: { width: 0.6 },
    0.0014: { width: 0.65 },
    0.0017: { width: 0.7 },
    0.0021: { width: 0.75 },
    0.0024: { width: 0.8 },
    0.003: { width: 0.85 },
    0.0035: { width: 0.9 },
    0.004: { width: 0.95 },
    0.0048: { width: 1.0 },
    0.0055: { width: 1.05 },
    0.006: { width: 1.1 },
    0.0073: { width: 1.15 },
    0.0078: { width: 1.2 },
    0.0086: { width: 1.25 },
    0.0099: { width: 1.3 },
    0.0109: { width: 1.35 },
    0.0123: { width: 1.4 },
    0.0132: { width: 1.45 },
    0.0142: { width: 1.5 },
    0.016: { width: 1.55 },
    0.017: { width: 1.6 },
    0.018: { width: 1.65 },
    0.022: { width: 1.7 },
    0.023: { width: 1.75 },
    0.0255: { width: 1.8 },
    0.027: { width: 1.85 },
    0.029: { width: 1.9 },
    0.031: { width: 1.95 },
    0.033: { width: 2.0 },
    0.035: { width: 2.05 },
    0.037: { width: 2.1 },
    0.04: { width: 2.15 },
    0.042: { width: 2.2 },
    0.047: { width: 2.25 },
    0.049: { width: 2.3 },
    0.052: { width: 2.35 },
    0.056: { width: 2.4 },
    0.06: { width: 2.45 },
    0.063: { width: 2.5 },
    0.067: { width: 2.55 },
    0.073: { width: 2.6 },
    0.077: { width: 2.65 },
    0.079: { width: 2.7 },
    0.083: { width: 2.75 },
    0.087: { width: 2.8 },
    0.092: { width: 2.85 },
    0.096: { width: 2.9 },
    0.102: { width: 2.95 },
    0.11: { width: 3.0 },
    0.114: { width: 3.05 },
    0.116: { width: 3.1 },
    0.12: { width: 3.15 },
    0.129: { width: 3.2 },
    0.138: { width: 3.25 },
    0.149: { width: 3.3 },
    0.154: { width: 3.35 },
    0.16: { width: 3.4 },
    0.165: { width: 3.45 },
    0.171: { width: 3.5 },
    0.179: { width: 3.55 },
    0.18: { width: 3.6 },
    0.19: { width: 3.65 },
    0.196: { width: 3.7 },
    0.211: { width: 3.75 },
    0.227: { width: 3.8 },
    0.238: { width: 3.85 },
    0.247: { width: 3.9 },
    0.254: { width: 3.95 },
    0.25: { width: 4.0 },
    0.28: { width: 4.25 },
    0.36: { width: 4.5 },
    0.44: { width: 4.75 },
    0.5: { width: 5.0 },
    0.56: { width: 5.25 },
    0.66: { width: 5.5 },
    0.75: { width: 5.75 },
    0.84: { width: 6.0 },
    0.93: { width: 6.25 },
    1.0: { width: 6.5 },
    1.25: { width: 6.8 },
    1.3: { width: 7.0 },
    1.5: { width: 7.3 },
    1.67: { width: 7.5 },
    1.75: { width: 7.75 },
    2.0: { width: 8.0 },
    2.11: { width: 8.25 },
    2.43: { width: 8.5 },
    2.5: { width: 8.7 },
    2.75: { width: 9.0 },
    3.0: { width: 9.1 },
    3.35: { width: 9.5 },
    3.5: { width: 9.75 },
    3.87: { width: 10.0 },
    4.0: { width: 10.25 },
    4.41: { width: 10.5 },
    4.5: { width: 10.75 },
    5.0: { width: 11.0 },
    5.49: { width: 11.25 },
    5.85: { width: 11.5 },
    6.84: { width: 12.0 },
    7.26: { width: 12.25 },
    7.36: { width: 12.5 },
    7.52: { width: 12.75 },
    8.51: { width: 13.0 },
    9.53: { width: 13.5 },
    10.49: { width: 14.0 },
    12.89: { width: 15.0 },
    16.06: { width: 16.0 },
  },
  princess: {
    0.015: { width: 1.5 },
    0.03: { width: 1.75 },
    0.06: { width: 2.0 },
    0.08: { width: 2.25 },
    0.1: { width: 2.5 },
    0.13: { width: 2.75 },
    0.18: { width: 3.0 },
    0.25: { width: 3.25 },
    0.29: { width: 3.5 },
    0.31: { width: 3.75 },
    0.39: { width: 4.0 },
    0.44: { width: 4.25 },
    0.5: { width: 4.5 },
    0.64: { width: 4.75 },
    0.75: { width: 5.0 },
    0.9: { width: 5.25 },
    1.0: { width: 5.5 },
    1.11: { width: 5.75 },
    1.25: { width: 6.0 },
    1.39: { width: 6.25 },
    1.5: { width: 6.5 },
    1.75: { width: 6.75 },
    2.0: { width: 7.0 },
    2.01: { width: 7.25 },
    2.5: { width: 7.5 },
    2.74: { width: 7.75 },
    3.0: { width: 8.0 },
    3.24: { width: 8.25 },
    3.5: { width: 8.5 },
    4.0: { width: 8.75 },
    4.5: { width: 9.25 },
    5.0: { width: 9.5 },
    5.36: { width: 9.75 },
    5.62: { width: 10.0 },
    5.76: { width: 10.25 },
    5.99: { width: 10.5 },
    7.44: { width: 11.0 },
    9.44: { width: 11.5 },
    9.52: { width: 12.0 },
  },
  emerald: {
    0.1: { length: 3, width: 2 },
    0.12: { length: 3.5, width: 2 },
    0.15: { length: 4, width: 2 },
    0.2: { length: 4, width: 3 },
    0.25: { length: 4.3, width: 3 },
    0.29: { length: 5, width: 3 },
    0.46: { length: 5.5, width: 3.5 },
    0.5: { length: 6, width: 4 },
    0.75: { length: 6.5, width: 4.5 },
    0.88: { length: 6.7, width: 4.5 },
    1.0: { length: 7, width: 5 },
    1.25: { length: 7.3, width: 5.3 },
    1.5: { length: 7.5, width: 5.5 },
    1.75: { length: 8, width: 6 },
    2.0: { length: 8.5, width: 6.5 },
    2.5: { length: 9, width: 7 },
    3.0: { length: 9.5, width: 7.5 },
    3.21: { length: 9.5, width: 7.5 },
    3.5: { length: 9.75, width: 7.7 },
    3.79: { length: 9.9, width: 7.8 },
    4.0: { length: 10, width: 8 },
    4.5: { length: 10.5, width: 8.5 },
    5.0: { length: 11, width: 9 },
    5.34: { length: 12, width: 8 },
    6.0: { length: 12, width: 10 },
    6.25: { length: 14, width: 8 },
    6.38: { length: 14, width: 9 },
    8.47: { length: 14, width: 10 },
    9.33: { length: 13, width: 11 },
    11.26: { length: 14, width: 12 },
    14.22: { length: 16, width: 12 },
  },
  cushion: {
    0.25: { width: 3.25 },
    0.4: { width: 4.2 },
    0.5: { width: 4.9 },
    0.75: { width: 5.25 },
    1.0: { width: 5.5 },
    1.25: { width: 6.0 },
    1.5: { width: 6.5 },
    1.75: { width: 6.75 },
    2.0: { width: 7.0 },
    2.5: { width: 7.5 },
    3.0: { width: 8.0 },
    3.5: { width: 8.5 },
    4.0: { width: 9.0 },
    4.5: { width: 9.25 },
    5.0: { width: 9.5 },
    5.62: { width: 10.0 },
    7.44: { width: 11.0 },
    9.52: { width: 12.0 },
    12.66: { width: 13.0 },
  },
  oval: {
    0.1: { length: 3.6, width: 2.7 },
    0.15: { length: 4, width: 3 },
    0.2: { length: 4.5, width: 3.5 },
    0.25: { length: 5, width: 3 },
    0.33: { length: 5.5, width: 3.5 },
    0.35: { length: 5, width: 4 },
    0.5: { length: 6, width: 4 },
    0.61: { length: 6, width: 5 },
    0.65: { length: 6.8, width: 4.5 },
    0.75: { length: 7, width: 5 },
    1.0: { length: 7.7, width: 5.7 },
    1.25: { length: 8, width: 6 },
    1.41: { length: 9, width: 6 },
    1.5: { length: 8.5, width: 6.5 },
    1.75: { length: 9, width: 6.5 },
    2.0: { length: 9, width: 7 },
    2.5: { length: 10, width: 8 },
    2.88: { length: 10.5, width: 8.5 },
    3.0: { length: 12, width: 8 },
    3.5: { length: 12, width: 8.5 },
    3.85: { length: 11, width: 9 },
    4.0: { length: 12.5, width: 8.5 },
    4.5: { length: 12.75, width: 8.5 },
    5.0: { length: 12, width: 10 },
    5.81: { length: 14, width: 10 },
    6.05: { length: 13, width: 11 },
    8.21: { length: 14, width: 12 },
    8.76: { length: 15, width: 12 },
    9.32: { length: 16, width: 12 },
    11.88: { length: 16, width: 14 },
    12.86: { length: 18, width: 13 },
    14.96: { length: 20, width: 15 },
  },
  pear: {
    0.13: { length: 3, width: 2 },
    0.18: { length: 4, width: 2.5 },
    0.21: { length: 4, width: 3 },
    0.25: { length: 5, width: 3 },
    0.35: { length: 5, width: 4 },
    0.5: { length: 6, width: 4 },
    0.6: { length: 6.5, width: 4.5 },
    0.75: { length: 7, width: 5 },
    0.85: { length: 7.5, width: 5.5 },
    1.0: { length: 7.7, width: 5.7 },
    1.25: { length: 8, width: 6 },
    1.5: { length: 8.5, width: 6.5 },
    1.75: { length: 10, width: 6 },
    1.8: { length: 8.7, width: 6.7 },
    2.0: { length: 9, width: 7 },
    2.5: { length: 10, width: 8 },
    2.61: { length: 11, width: 7.5 },
    2.7: { length: 11, width: 8 },
    3.0: { length: 12, width: 8 },
    3.12: { length: 12, width: 7 },
    3.4: { length: 13, width: 8 },
    3.5: { length: 12, width: 9 },
    4.0: { length: 14, width: 8 },
    4.11: { length: 13, width: 9 },
    4.25: { length: 14, width: 9 },
    4.5: { length: 14.5, width: 9 },
    5.0: { length: 15, width: 9 },
    5.41: { length: 14, width: 10 },
    5.65: { length: 13, width: 11 },
    5.75: { length: 15, width: 10 },
    5.86: { length: 16, width: 9 },
    6.27: { length: 16, width: 10 },
    6.46: { length: 17, width: 10 },
    7.36: { length: 15, width: 11 },
    8.14: { length: 18, width: 11 },
    8.99: { length: 16, width: 12 },
    9.35: { length: 18, width: 12 },
    10.21: { length: 18, width: 13 },
  },
  heart: {
    0.18: { width: 3.5 },
    0.25: { width: 4.0 },
    0.28: { width: 4.25 },
    0.34: { width: 4.5 },
    0.38: { width: 4.75 },
    0.5: { width: 5.0 },
    0.61: { width: 5.5 },
    0.75: { width: 6.0 },
    0.83: { width: 6.25 },
    1.0: { width: 6.5 },
    1.25: { width: 7.0 },
    1.5: { width: 7.5 },
    1.75: { width: 7.7 },
    2.0: { width: 8.0 },
    2.5: { width: 8.5 },
    3.0: { width: 9.0 },
    3.5: { width: 10.0 },
    4.0: { width: 10.5 },
    4.5: { width: 11.0 },
    5.0: { width: 11.5 },
    5.66: { width: 12.0 },
    7.88: { width: 13.0 },
    9.38: { width: 14.0 },
    10.79: { width: 15.0 },
    13.27: { width: 16.0 },
    15.33: { width: 18.0 },
  },
  marquise: {
    0.025: { length: 3, width: 1.5 },
    0.055: { length: 3.5, width: 1.75 },
    0.07: { length: 3.5, width: 2 },
    0.1: { length: 4, width: 2 },
    0.11: { length: 3.75, width: 1.75 },
    0.12: { length: 4.25, width: 2.25 },
    0.14: { length: 5, width: 2.5 },
    0.16: { length: 5.5, width: 2.75 },
    0.18: { length: 5.5, width: 3 },
    0.2: { length: 5, width: 3 },
    0.23: { length: 6.5, width: 3 },
    0.25: { length: 6, width: 3 },
    0.3: { length: 7, width: 3 },
    0.33: { length: 7.5, width: 3.5 },
    0.34: { length: 7, width: 4 },
    0.5: { length: 8, width: 4 },
    0.7: { length: 8.75, width: 4.25 },
    0.75: { length: 9, width: 4.5 },
    0.85: { length: 9.5, width: 4.7 },
    1.0: { length: 10, width: 5 },
    1.25: { length: 11, width: 5.5 },
    1.33: { length: 11.5, width: 6 },
    1.5: { length: 12, width: 6 },
    1.75: { length: 12.5, width: 6.25 },
    2.0: { length: 13, width: 6.5 },
    2.5: { length: 14, width: 7 },
    3.0: { length: 15, width: 7 },
    3.25: { length: 15, width: 7.5 },
    3.5: { length: 15, width: 8 },
    3.86: { length: 16, width: 8 },
    4.0: { length: 16.5, width: 8.25 },
    4.5: { length: 16.75, width: 8.5 },
    5.0: { length: 17, width: 8.5 },
    5.5: { length: 17.5, width: 10 },
    7.08: { length: 20, width: 8 },
    7.94: { length: 20, width: 10 },
    9.5: { length: 20, width: 11 },
  },
  radiant: {
    0.25: { length: 4.3, width: 3 },
    0.34: { length: 4.5, width: 3.5 },
    0.41: { length: 6, width: 3 },
    0.5: { length: 6, width: 4 },
    0.75: { length: 6.5, width: 4.5 },
    1.0: { length: 7, width: 5 },
    1.25: { length: 7.3, width: 5.3 },
    1.5: { length: 7.5, width: 5.5 },
    1.75: { length: 8, width: 6 },
    2.0: { length: 8.2, width: 6.2 },
    2.25: { length: 8.5, width: 6.5 },
    2.5: { length: 9, width: 7 },
    3.0: { length: 9.5, width: 7.5 },
    3.31: { length: 10, width: 7 },
    3.5: { length: 10, width: 8 },
    4.0: { length: 10.2, width: 8.2 },
    4.5: { length: 10.5, width: 8.5 },
    5.0: { length: 11, width: 9 },
    6.06: { length: 12, width: 9 },
    6.45: { length: 11.5, width: 10 },
    6.54: { length: 13, width: 9 },
    6.79: { length: 13.2, width: 9.2 },
    8.47: { length: 14, width: 10 },
    9.33: { length: 13, width: 11 },
    10.19: { length: 13.5, width: 11.5 },
    11.48: { length: 15, width: 11 },
    12.14: { length: 14, width: 12 },
    14.22: { length: 16, width: 12 },
  },
  asscher: {
    0.25: { width: 3.25 },
    0.39: { width: 4.0 },
    0.5: { width: 4.5 },
    0.75: { width: 5.0 },
    1.0: { width: 5.5 },
    1.25: { width: 6.0 },
    1.5: { width: 6.5 },
    1.75: { width: 6.7 },
    2.0: { width: 7.0 },
    2.5: { width: 7.5 },
    3.0: { width: 8.0 },
    3.5: { width: 8.5 },
    4.0: { width: 9.0 },
    4.5: { width: 9.25 },
    5.0: { width: 9.5 },
    5.62: { width: 10.0 },
    7.44: { width: 11.0 },
    9.52: { width: 12.0 },
    12.66: { width: 13.0 },
  },
}

export function DiamondCalculator() {
  const [selectedShape, setSelectedShape] = useState<string>("round")
  const [selectedCarat, setSelectedCarat] = useState<number | null>(null)
  const [customCarat, setCustomCarat] = useState<string>("")

  const getSize = () => {
    const caratValue = customCarat ? Number.parseFloat(customCarat) : selectedCarat
    if (!caratValue || isNaN(caratValue)) return null

    const shapeData = SIZE_DATA[selectedShape]
    if (!shapeData) return null

    const carats = Object.keys(shapeData)
      .map(Number)
      .sort((a, b) => a - b)
    const maxCarat = carats[carats.length - 1]

    if (caratValue > maxCarat) {
      return "exceeded"
    }

    // If exact match exists, return it
    if (shapeData[caratValue]) {
      return shapeData[caratValue]
    }

    // Interpolate between two closest values
    let lower = null
    let upper = null

    for (let i = 0; i < carats.length; i++) {
      if (carats[i] < caratValue) lower = carats[i]
      if (carats[i] > caratValue && !upper) {
        upper = carats[i]
        break
      }
    }

    if (!lower && upper) return shapeData[upper]
    if (lower && !upper) return shapeData[lower]
    if (!lower || !upper) return null

    const lowerData = shapeData[lower]
    const upperData = shapeData[upper]
    const ratio = (caratValue - lower) / (upper - lower)

    return {
      width: lowerData.width + (upperData.width - lowerData.width) * ratio,
      length:
        lowerData.length && upperData.length
          ? lowerData.length + (upperData.length - lowerData.length) * ratio
          : undefined,
    }
  }

  const size = getSize()
  const displayCarat = customCarat ? Number.parseFloat(customCarat) : selectedCarat

  return (
    <Card className="p-10 border border-border">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-card-foreground">Diamond Size Calculator</CardTitle>
        <CardDescription className="text-base text-foreground/70 leading-relaxed">
          Select a diamond shape and carat weight to see the approximate dimensions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Select Shape</Label>
          <div className="grid grid-cols-5 gap-2">
            {DIAMOND_SHAPES.map((shape) => (
              <button
                key={shape.id}
                onClick={() => {
                  setSelectedShape(shape.id)
                  setSelectedCarat(null)
                  setCustomCarat("")
                }}
                className={`
                  flex flex-col items-center justify-center p-4 border-2 transition-all duration-300 min-h-[220px]
                  ${
                    selectedShape === shape.id
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                      : "border-border hover:border-[#D4AF37]/50 hover:bg-muted"
                  }
                `}
              >
                <DiamondIcon
                  shape={shape.id}
                  className={`w-48 h-48 mb-2 ${selectedShape === shape.id ? "text-[#D4AF37]" : "text-foreground/60"}`}
                />
                <span className="text-xs font-medium">{shape.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Select Carat Weight</Label>
          <div className="grid grid-cols-6 gap-2">
            {PRESET_CARATS[selectedShape].map((weight) => {
              return (
                <button
                  key={weight}
                  onClick={() => {
                    setSelectedCarat(weight)
                    setCustomCarat("")
                  }}
                  className={`
                    p-3 border-2 transition-all duration-300 text-sm font-semibold
                    ${
                      selectedCarat === weight && !customCarat
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                        : "border-border hover:border-[#D4AF37]/50 hover:bg-muted"
                    }
                  `}
                >
                  {weight}ct
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Or Enter Custom Carat Weight</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="e.g., 1.73"
            value={customCarat}
            onChange={(e) => {
              setCustomCarat(e.target.value)
              setSelectedCarat(null)
            }}
            className="border-2 border-border focus:border-[#D4AF37] bg-background"
          />
        </div>

        {displayCarat !== null && size && size !== "exceeded" && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Approximate Dimensions for {displayCarat} ct</p>
            {size.length ? (
              <p className="text-2xl font-bold text-[#D4AF37]">
                {size.length.toFixed(2)} × {size.width.toFixed(2)} mm
              </p>
            ) : (
              <p className="text-2xl font-bold text-[#D4AF37]">{size.width.toFixed(2)} mm</p>
            )}
          </div>
        )}

        {size === "exceeded" && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-600 font-medium">I'm not trained on that. Try a smaller value.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
