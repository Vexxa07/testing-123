import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, ArrowUp, ArrowDown, Thermometer, TrendingUp, TrendingDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SentimentGauge from '../components/SentimentGauge';

// Mock historical sentiment data
const generateSentimentData = () => {
  const data = [];
  const currentDate = new Date();
  let baseValue = 50; // Start at neutral
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(currentDate.getDate() - i);
    
    // Calculate a semi-random sentiment value with some trend
    const randomFactor = Math.random() * 10 - 5; // Random value between -5 and 5
    const trendFactor = Math.sin(i / 10) * 10; // Add a sinusoidal trend
    let sentiment = baseValue + randomFactor + trendFactor;
    
    // Keep within bounds (0-100)
    sentiment = Math.max(0, Math.min(100, sentiment));
    baseValue = sentiment; // Each new value is based on the previous
    
    data.push({
      date: date.toISOString().split('T')[0],
      sentiment: Math.round(sentiment),
      volume: 50 + Math.random() * 100 // Random trading volume
    });
  }
  
  return data;
};

const sentimentData = generateSentimentData();

// Mock news sentiment data
const newsSentiment = [
  { source: 'Bloomberg', sentiment: 72, headline: 'Institutional Adoption of Crypto Accelerates', date: '2h ago', impact: 'high' },
  { source: 'CoinDesk', sentiment: 65, headline: 'Bitcoin ETF Sees Strong Inflows for Third Week', date: '4h ago', impact: 'medium' },
  { source: 'Reuters', sentiment: 45, headline: 'Central Bank Warns of Crypto Risks to Financial System', date: '6h ago', impact: 'medium' },
  { source: 'Wall Street Journal', sentiment: 37, headline: 'Regulatory Concerns Grow as Crypto Market Expands', date: '8h ago', impact: 'high' },
  { source: 'CNBC', sentiment: 83, headline: 'Major Bank Launches Crypto Custody Service', date: '12h ago', impact: 'high' }
];

// Mock social media sentiment
const socialSentiment = [
  { platform: 'Twitter', sentiment: 63, volume: 12500, change: 5 },
  { platform: 'Reddit', sentiment: 71, volume: 8750, change: 3 },
  { platform: 'Telegram', sentiment: 58, volume: 5200, change: -2 },
  { platform: 'Discord', sentiment: 65, volume: 4300, change: 0 }
];

// Analysis components
const sentimentFactors = [
  { name: 'Market Momentum', score: 75, trend: 'up', description: 'Strong upward price action across major assets' },
  { name: 'Volatility', score: 45, trend: 'down', description: 'Decreasing price volatility indicates market stabilization' },
  { name: 'Trading Volume', score: 68, trend: 'up', description: 'Increasing trading volumes suggest growing interest' },
  { name: 'Social Sentiment', score: 65, trend: 'up', description: 'Positive sentiment from retail investors on social media' },
  { name: 'Whale Activity', score: 35, trend: 'down', description: 'Large holders appear to be accumulating rather than selling' },
  { name: 'Regulatory News', score: 40, trend: 'neutral', description: 'Mixed regulatory developments globally' }
];

const Sentiment = () => {
  const [currentSentiment, setCurrentSentiment] = useState(65);
  const [timeframe, setTimeframe] = useState('30d');
  
  // Calculate current sentiment by averaging the factors
  useEffect(() => {
    const averageSentiment = Math.round(
      sentimentFactors.reduce((acc, factor) => acc + factor.score, 0) / sentimentFactors.length
    );
    setCurrentSentiment(averageSentiment);
  }, []);
  
  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-base font-semibold text-primary">
            Sentiment: {payload[0].value}
          </p>
          {payload[1] && (
            <p className="text-sm text-muted-foreground">
              Volume: {payload[1].value}
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">Market Sentiment Analysis</h1>
          <p className="text-muted-foreground mb-8">Track the overall market sentiment and emotional state of crypto investors</p>
          
          {/* Main sentiment gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="crypto-card col-span-1">
              <h2 className="text-xl font-semibold mb-6 text-center">Current Market Sentiment</h2>
              <div className="flex justify-center mb-8">
                <SentimentGauge value={currentSentiment} size="lg" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Updated: {new Date().toLocaleString()}
              </p>
            </div>
            
            <div className="crypto-card col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Sentiment Trend</h2>
                <div className="flex border border-border rounded-md overflow-hidden">
                  <button
                    onClick={() => setTimeframe('7d')}
                    className={`px-3 py-1 text-sm ${timeframe === '7d' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'}`}
                  >
                    7D
                  </button>
                  <button
                    onClick={() => setTimeframe('30d')}
                    className={`px-3 py-1 text-sm ${timeframe === '30d' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'}`}
                  >
                    30D
                  </button>
                  <button
                    onClick={() => setTimeframe('90d')}
                    className={`px-3 py-1 text-sm ${timeframe === '90d' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'}`}
                  >
                    90D
                  </button>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={sentimentData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                      }}
                      tick={{ fontSize: 12 }}
                      stroke="var(--muted-foreground)"
                      tickLine={false}
                      axisLine={false}
                      minTickGap={30}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tick={{ fontSize: 12 }}
                      stroke="var(--muted-foreground)"
                      tickLine={false}
                      axisLine={false}
                      width={30}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="sentiment" 
                      stroke="#0EA5E9" 
                      fillOpacity={1} 
                      fill="url(#colorSentiment)" 
                      strokeWidth={2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Sentiment factors */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Sentiment Factors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sentimentFactors.map((factor, index) => (
                <div key={index} className="crypto-card">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{factor.name}</h3>
                    <div className={`flex items-center ${
                      factor.trend === 'up' ? 'text-crypto-green' : 
                      factor.trend === 'down' ? 'text-crypto-red' : 'text-muted-foreground'
                    }`}>
                      {factor.trend === 'up' ? <TrendingUp size={16} /> : 
                       factor.trend === 'down' ? <TrendingDown size={16} /> : 
                       <span>—</span>}
                    </div>
                  </div>
                  
                  <div className="w-full bg-secondary/30 rounded-full h-3 mb-3">
                    <div 
                      className="bg-primary h-3 rounded-full" 
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-muted-foreground">Bearish</span>
                    <span className="font-semibold">{factor.score}/100</span>
                    <span className="text-muted-foreground">Bullish</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* News sentiment */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">News Sentiment</h2>
            
            <div className="crypto-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold">Source</th>
                      <th className="px-4 py-3 text-left font-semibold">Headline</th>
                      <th className="px-4 py-3 text-center font-semibold">Sentiment</th>
                      <th className="px-4 py-3 text-right font-semibold">Impact</th>
                      <th className="px-4 py-3 text-right font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsSentiment.map((item, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{item.source}</td>
                        <td className="px-4 py-3">{item.headline}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center items-center">
                            <div className="w-24">
                              <div className="w-full bg-secondary/30 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    item.sentiment >= 60 ? 'bg-crypto-green' :
                                    item.sentiment >= 40 ? 'bg-primary' : 'bg-crypto-red'
                                  }`}
                                  style={{ width: `${item.sentiment}%` }}
                                />
                              </div>
                            </div>
                            <span className="ml-2 font-medium">{item.sentiment}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            item.impact === 'high' ? 'bg-primary/10 text-primary' :
                            item.impact === 'medium' ? 'bg-secondary text-muted-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {item.impact}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          
          {/* Social sentiment */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Social Media Sentiment</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="crypto-card">
                <h3 className="text-lg font-semibold mb-4">Sentiment by Platform</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={socialSentiment}
                      margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis 
                        dataKey="platform" 
                        tick={{ fontSize: 12 }}
                        stroke="var(--muted-foreground)"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        ticks={[0, 25, 50, 75, 100]}
                        tick={{ fontSize: 12 }}
                        stroke="var(--muted-foreground)"
                        tickLine={false}
                        axisLine={false}
                        width={30}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="sentiment" 
                        fill="#0EA5E9" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="crypto-card">
                <h3 className="text-lg font-semibold mb-4">Platform Details</h3>
                <div className="space-y-6">
                  {socialSentiment.map((platform, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{platform.platform}</h4>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">{platform.sentiment}</span>
                          <div className={`flex items-center ${platform.change >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                            {platform.change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                            <span className="text-sm">{Math.abs(platform.change)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-secondary/30 rounded-full h-2 mb-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${platform.sentiment}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Volume: {platform.volume.toLocaleString()} posts</span>
                        <span>Updated 30 min ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sentiment;
