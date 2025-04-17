
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  price: number;
}

interface PriceChartProps {
  coinId: string;
  coinName: string;
  timeRange: '24h' | '7d' | '30d' | '90d' | '1y';
  color?: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ 
  coinId, 
  coinName, 
  timeRange,
  color = "#0EA5E9" 
}) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0 });
  
  // Generate mock chart data
  useEffect(() => {
    setIsLoading(true);
    
    // Number of data points based on time range
    const dataPoints = timeRange === '24h' ? 24 : 
                      timeRange === '7d' ? 7 * 24 : 
                      timeRange === '30d' ? 30 : 
                      timeRange === '90d' ? 90 : 365;
                      
    const now = new Date();
    const basePrice = coinId === 'bitcoin' ? 52000 : 
                    coinId === 'ethereum' ? 2800 : 
                    coinId === 'binancecoin' ? 450 : 
                    coinId === 'solana' ? 120 : 0.45;
                    
    const volatility = coinId === 'bitcoin' ? 0.03 : 
                      coinId === 'ethereum' ? 0.04 : 
                      coinId === 'binancecoin' ? 0.05 : 
                      coinId === 'solana' ? 0.06 : 0.07;
    
    const mockData: ChartData[] = [];
    let prevPrice = basePrice;
    
    for (let i = dataPoints; i >= 0; i--) {
      const date = new Date(now.getTime());
      
      if (timeRange === '24h') {
        date.setHours(date.getHours() - i);
      } else if (timeRange === '7d') {
        date.setHours(date.getHours() - i);
      } else if (timeRange === '30d') {
        date.setDate(date.getDate() - i);
      } else if (timeRange === '90d') {
        date.setDate(date.getDate() - i);
      } else {
        date.setDate(date.getDate() - i);
      }
      
      // Create a somewhat realistic price movement with some trend and randomness
      const randomFactor = Math.random() * volatility - volatility / 2;
      const trendFactor = Math.sin(i / (dataPoints / 4)) * (volatility / 2);
      const priceChange = prevPrice * (randomFactor + trendFactor);
      prevPrice = prevPrice + priceChange;
      
      mockData.push({
        date: date.toISOString(),
        price: prevPrice
      });
    }
    
    // Calculate price change
    const firstPrice = mockData[0].price;
    const lastPrice = mockData[mockData.length - 1].price;
    const change = lastPrice - firstPrice;
    const percentChange = (change / firstPrice) * 100;
    
    setPriceChange({
      value: change,
      percentage: percentChange
    });
    
    setChartData(mockData);
    setIsLoading(false);
  }, [coinId, timeRange]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    if (timeRange === '24h') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === '7d') {
      return date.toLocaleDateString([], { weekday: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded shadow-lg">
          <p className="text-sm font-medium">
            {formatDate(payload[0].payload.date)}
          </p>
          <p className="text-base font-semibold text-primary">
            {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse h-64 bg-muted/50 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }
  
  return (
    <div className="crypto-card">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{coinName} Price Chart</h2>
          <p className="text-muted-foreground text-sm">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">
            {formatPrice(chartData[chartData.length - 1]?.price)}
          </p>
          <p className={`text-sm font-medium ${priceChange.percentage >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
            {priceChange.percentage >= 0 ? '+' : ''}
            {priceChange.percentage.toFixed(2)}% 
            ({priceChange.value >= 0 ? '+' : ''}
            {formatPrice(priceChange.value)})
          </p>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate} 
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => formatPrice(value)}
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={color} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              strokeWidth={2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
