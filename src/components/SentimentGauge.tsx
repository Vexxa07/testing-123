
import React, { useState, useEffect } from 'react';

interface SentimentGaugeProps {
  value: number; // from 0 to 100
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({ 
  value, 
  size = 'md',
  animated = true
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    if (animated) {
      // Animate the gauge value
      const duration = 1500; // ms
      const interval = 20; // ms
      const steps = duration / interval;
      const step = value / steps;
      
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        setCurrentValue(current);
      }, interval);
      
      return () => clearInterval(timer);
    } else {
      setCurrentValue(value);
    }
  }, [value, animated]);
  
  // Size styles
  const sizeStyles = {
    sm: {
      width: 120,
      height: 60,
      fontSize: 'text-sm',
      strokeWidth: 8
    },
    md: {
      width: 160,
      height: 80,
      fontSize: 'text-base',
      strokeWidth: 10
    },
    lg: {
      width: 200,
      height: 100,
      fontSize: 'text-lg',
      strokeWidth: 12
    }
  };
  
  const { width, height, fontSize, strokeWidth } = sizeStyles[size];
  
  // Calculate the sentiment color
  const getColor = (val: number) => {
    if (val < 30) return '#EF4444'; // Red for bearish
    if (val < 45) return '#F97316'; // Orange for slightly bearish
    if (val < 55) return '#FACC15'; // Yellow for neutral
    if (val < 70) return '#10B981'; // Green for slightly bullish
    return '#0EA5E9'; // Teal for bullish
  };
  
  // Calculate the sentiment text
  const getSentimentText = (val: number) => {
    if (val < 30) return 'Bearish';
    if (val < 45) return 'Slightly Bearish';
    if (val < 55) return 'Neutral';
    if (val < 70) return 'Slightly Bullish';
    return 'Bullish';
  };
  
  // Calculate the angle for the gauge needle
  const angle = (currentValue / 100) * 180;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative overflow-hidden"
        style={{ width, height: height * 0.8 }}
      >
        {/* Gauge background */}
        <div 
          className="absolute bottom-0 left-0 w-full rounded-t-full overflow-hidden bg-muted"
          style={{ height: height * 0.5 }}
        >
          {/* Gauge fill */}
          <div
            className="absolute bottom-0 left-0 rounded-t-full transition-all duration-300"
            style={{
              width: '100%',
              height: '100%',
              background: `conic-gradient(
                ${getColor(currentValue)} ${angle}deg,
                transparent ${angle}deg,
                transparent 180deg
              )`,
              transformOrigin: 'bottom center'
            }}
          />
        </div>
        
        {/* Value display */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-background border-2 border-border shadow-md"
          style={{ bottom: height * 0.01 }}
        >
          <span className={`font-bold ${fontSize}`}>
            {Math.round(currentValue)}
          </span>
        </div>
        
        {/* Gauge ticks */}
        <div 
          className="absolute bottom-0 left-0 w-full flex justify-between px-4"
          style={{ bottom: height * 0.1 }}
        >
          <div className="h-2 w-0.5 bg-muted-foreground" />
          <div className="h-1 w-0.5 bg-muted-foreground" />
          <div className="h-2 w-0.5 bg-muted-foreground" />
          <div className="h-1 w-0.5 bg-muted-foreground" />
          <div className="h-2 w-0.5 bg-muted-foreground" />
        </div>
      </div>
      
      <div className="mt-2 font-medium" style={{ color: getColor(currentValue) }}>
        {getSentimentText(currentValue)}
      </div>
    </div>
  );
};

export default SentimentGauge;
