"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  max?: number;
  min?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value = [0], onValueChange, max = 100, min = 0, step = 1, disabled = false, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(value);
    const sliderRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleSliderClick = (event: React.MouseEvent) => {
      if (disabled || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = (event.clientX - rect.left) / rect.width;
      const newValue = Math.round(min + percentage * (max - min) / step) * step;
      const clampedValue = Math.max(min, Math.min(max, newValue));
      
      const newValues = [clampedValue];
      setLocalValue(newValues);
      onValueChange?.(newValues);
    };

    const percentage = ((localValue[0] - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={handleSliderClick}
        {...props}
      >
        <div
          ref={sliderRef}
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-700"
        >
          <div 
            className="absolute h-full bg-red-500 transition-all" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className="absolute block h-5 w-5 rounded-full border-2 border-red-500 bg-white shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider } 