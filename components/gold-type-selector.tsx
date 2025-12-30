"use client"

interface GoldTypeSelectorProps {
  value: string
  onChange: (value: string) => void
}

const goldTypes = [
  {
    value: "14k-yellow",
    label: "14k Yellow Gold",
    beads: [{ color: "#FFD700", label: "Gold" }],
    hue: "bg-yellow-50/30",
    borderColor: "border-yellow-200/50",
  },
  {
    value: "14k-rose",
    label: "14k Rose Gold",
    beads: [
      { color: "#FFD700", label: "Gold" },
      { color: "#B87333", label: "Copper" },
    ],
    hue: "bg-rose-50/30",
    borderColor: "border-rose-200/50",
  },
  {
    value: "14k-white",
    label: "14k White Gold",
    beads: [
      { color: "#FFD700", label: "Gold" },
      { color: "#E8E8E8", label: "Palladium" },
    ],
    hue: "bg-gray-50/30",
    borderColor: "border-gray-200/50",
  },
]

export function GoldTypeSelector({ value, onChange }: GoldTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">Gold Type</label>
      <div className="grid grid-cols-3 gap-2">
        {goldTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onChange(type.value)}
            className={`relative border-2 p-2 transition-all ${
              value === type.value
                ? "border-[#D4AF37] bg-[#D4AF37]/10"
                : `${type.borderColor} ${type.hue} hover:border-[#D4AF37]/50`
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex justify-center gap-0.5 h-4 items-center">
                {type.beads.map((bead, index) => (
                  <div key={index} className="flex gap-0.5 animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div
                      className="w-1.5 h-1.5 rounded-full shadow-sm"
                      style={{ backgroundColor: bead.color }}
                      title={bead.label}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full shadow-sm"
                      style={{ backgroundColor: bead.color }}
                      title={bead.label}
                    />
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-900 text-center leading-tight">{type.label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
