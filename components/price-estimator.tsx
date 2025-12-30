'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DollarSign } from 'lucide-react'

export function PriceEstimator() {
  const [carat, setCarat] = useState<string>('')
  const [cut, setCut] = useState<string>('excellent')
  const [color, setColor] = useState<string>('G')
  const [clarity, setClarity] = useState<string>('VS2')
  const [result, setResult] = useState<string>('')

  const estimatePrice = () => {
    const caratWeight = parseFloat(carat)
    if (isNaN(caratWeight) || caratWeight <= 0) {
      setResult('Please enter a valid carat weight')
      return
    }

    // Base price per carat (simplified estimation)
    let basePrice = 5000

    // Adjust for cut
    const cutMultiplier = {
      'excellent': 1.2,
      'very-good': 1.1,
      'good': 1.0,
      'fair': 0.8,
      'poor': 0.6
    }[cut] || 1.0

    // Adjust for color
    const colorMultiplier = {
      'D': 1.3, 'E': 1.25, 'F': 1.2,
      'G': 1.1, 'H': 1.0, 'I': 0.9,
      'J': 0.8, 'K': 0.7
    }[color] || 1.0

    // Adjust for clarity
    const clarityMultiplier = {
      'FL': 1.5, 'IF': 1.4, 'VVS1': 1.3, 'VVS2': 1.2,
      'VS1': 1.1, 'VS2': 1.0, 'SI1': 0.9, 'SI2': 0.8,
      'I1': 0.7
    }[clarity] || 1.0

    const pricePerCarat = basePrice * cutMultiplier * colorMultiplier * clarityMultiplier
    const totalPrice = pricePerCarat * caratWeight

    const minPrice = (totalPrice * 0.8).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    const maxPrice = (totalPrice * 1.2).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

    setResult(`Estimated price range: ${minPrice} - ${maxPrice}`)
  }

  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-6 w-6 text-accent" />
        <h3 className="text-xl font-semibold text-card-foreground">
          Diamond Price Estimator
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Get an approximate price range based on the 4 Cs. Actual prices may vary.
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price-carat">Carat Weight</Label>
          <Input
            id="price-carat"
            type="number"
            step="0.01"
            placeholder="1.00"
            value={carat}
            onChange={(e) => setCarat(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cut">Cut Quality</Label>
          <Select value={cut} onValueChange={setCut}>
            <SelectTrigger id="cut">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="very-good">Very Good</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color Grade</Label>
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger id="color">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="D">D (Colorless)</SelectItem>
              <SelectItem value="E">E (Colorless)</SelectItem>
              <SelectItem value="F">F (Colorless)</SelectItem>
              <SelectItem value="G">G (Near Colorless)</SelectItem>
              <SelectItem value="H">H (Near Colorless)</SelectItem>
              <SelectItem value="I">I (Near Colorless)</SelectItem>
              <SelectItem value="J">J (Near Colorless)</SelectItem>
              <SelectItem value="K">K (Faint Color)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="clarity">Clarity Grade</Label>
          <Select value={clarity} onValueChange={setClarity}>
            <SelectTrigger id="clarity">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FL">FL (Flawless)</SelectItem>
              <SelectItem value="IF">IF (Internally Flawless)</SelectItem>
              <SelectItem value="VVS1">VVS1 (Very Very Slightly Included)</SelectItem>
              <SelectItem value="VVS2">VVS2 (Very Very Slightly Included)</SelectItem>
              <SelectItem value="VS1">VS1 (Very Slightly Included)</SelectItem>
              <SelectItem value="VS2">VS2 (Very Slightly Included)</SelectItem>
              <SelectItem value="SI1">SI1 (Slightly Included)</SelectItem>
              <SelectItem value="SI2">SI2 (Slightly Included)</SelectItem>
              <SelectItem value="I1">I1 (Included)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={estimatePrice} className="w-full">
          Estimate Price
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-muted border border-border">
            <p className="text-sm font-medium text-foreground">{result}</p>
            <p className="text-xs text-muted-foreground mt-2">
              *This is an estimate only. Actual prices vary based on market conditions and specific diamond characteristics.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
