
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, PieChart, LineChart, BarChart, Zap, TrendingUp as TrendingUpIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PriceChart from '../components/PriceChart';
import SentimentGauge from '../components/SentimentGauge';

// Add type definitions for portfolio items
interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
}

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'transactions'>('overview');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: 0.25, buyPrice: 48000, currentPrice: 52387 },
    { id: '2', name: 'Ethereum', symbol: 'ETH', amount: 3.5, buyPrice: 2500, currentPrice: 2843 },
    { id: '3', name: 'Solana', symbol: 'SOL', amount: 15, buyPrice: 110, currentPrice: 124 },
    { id: '4', name: 'Cardano', symbol: 'ADA', amount: 2000, buyPrice: 0.5, currentPrice: 0.45 },
  ]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState({ value: 0, percentage: 0 });
  const [currentSentimentValue, setCurrentSentimentValue] = useState(65);
  
  // Calculate portfolio value and profit/loss
  useEffect(() => {
    // Calculate current value
    const currentValue = portfolioItems.reduce(
      (total, item) => total + item.amount * item.currentPrice, 
      0
    );
    
    // Calculate purchase value
    const purchaseValue = portfolioItems.reduce(
      (total, item) => total + item.amount * item.buyPrice, 
      0
    );
    
    // Calculate profit/loss
    const profitValue = currentValue - purchaseValue;
    const profitPercentage = (profitValue / purchaseValue) * 100;
    
    setPortfolioValue(currentValue);
    setProfitLoss({ 
      value: profitValue, 
      percentage: profitPercentage 
    });
  }, [portfolioItems]);
  
  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioItems(prevItems => 
        prevItems.map(item => ({
          ...item,
          currentPrice: item.currentPrice * (1 + (Math.random() * 0.02 - 0.01))
        }))
      );
      
      // Simulate sentiment changes
      setCurrentSentimentValue(prev => {
        const change = Math.random() * 2 - 1; // Random value between -1 and 1
        return Math.min(Math.max(prev + change, 0), 100); // Keep value between 0 and 100
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  const formatCryptoCurrency = (amount: number, symbol: string) => {
    return `${amount.toLocaleString('en-US', {
      minimumFractionDigits: symbol === 'BTC' ? 8 : 2,
      maximumFractionDigits: symbol === 'BTC' ? 8 : 4
    })} ${symbol}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
          
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="crypto-card col-span-2">
              <h2 className="text-xl font-semibold mb-4">Portfolio Value</h2>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-3xl font-bold">
                    {formatCurrency(portfolioValue)}
                  </p>
                  <div className={`flex items-center mt-2 ${profitLoss.value >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                    {profitLoss.value >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span className="ml-1 font-medium">
                      {formatCurrency(Math.abs(profitLoss.value))} ({Math.abs(profitLoss.percentage).toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="space-x-2">
                  <button className="crypto-button bg-transparent border border-primary hover:bg-primary/10 text-primary px-3 py-1">
                    Deposit
                  </button>
                  <button className="crypto-button px-3 py-1">
                    Trade
                  </button>
                </div>
              </div>
              
              <div className="h-56">
                <PriceChart 
                  coinId="portfolio" 
                  coinName="Portfolio Performance" 
                  timeRange="30d"
                  color="#22c55e"
                />
              </div>
            </div>
            
            <div className="crypto-card flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Market Sentiment</h2>
              <div className="flex-1 flex flex-col items-center justify-center">
                <SentimentGauge value={currentSentimentValue} size="lg" />
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Current market sentiment is {currentSentimentValue < 30 ? 'bearish' : 
                                              currentSentimentValue < 45 ? 'slightly bearish' : 
                                              currentSentimentValue < 55 ? 'neutral' : 
                                              currentSentimentValue < 70 ? 'slightly bullish' : 'bullish'}.
                </p>
              </div>
            </div>
          </div>
          
          {/* Portfolio Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <div className="flex space-x-8">
                <button
                  className={`py-2 font-medium border-b-2 ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent hover:text-primary'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`py-2 font-medium border-b-2 ${activeTab === 'assets' ? 'border-primary text-primary' : 'border-transparent hover:text-primary'}`}
                  onClick={() => setActiveTab('assets')}
                >
                  Assets
                </button>
                <button
                  className={`py-2 font-medium border-b-2 ${activeTab === 'transactions' ? 'border-primary text-primary' : 'border-transparent hover:text-primary'}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  Transactions
                </button>
              </div>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="crypto-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Allocation</h3>
                    <PieChart size={20} className="text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    {portfolioItems.map(item => {
                      const value = item.amount * item.currentPrice;
                      const percentage = (value / portfolioValue) * 100;
                      
                      return (
                        <div key={item.id}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <span className="text-xs font-bold">{item.symbol.charAt(0)}</span>
                              </div>
                              <span>{item.name}</span>
                            </div>
                            <span>{percentage.toFixed(2)}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="crypto-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Performance</h3>
                    <LineChart size={20} className="text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Today</p>
                      <div className="flex justify-between">
                        <span className="font-medium">+$326.52</span>
                        <span className="text-crypto-green">+1.24%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">This Week</p>
                      <div className="flex justify-between">
                        <span className="font-medium">+$1,458.23</span>
                        <span className="text-crypto-green">+5.67%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">This Month</p>
                      <div className="flex justify-between">
                        <span className="font-medium">+$3,842.91</span>
                        <span className="text-crypto-green">+12.34%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">All Time</p>
                      <div className="flex justify-between">
                        <span className="font-medium">+$7,218.76</span>
                        <span className="text-crypto-green">+29.83%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="crypto-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Insights</h3>
                    <TrendingUpIcon size={20} className="text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/5 rounded-md border border-primary/10">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Zap size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Portfolio Alert</h4>
                          <p className="text-sm text-muted-foreground">
                            BTC is up 5.2% in the last 24 hours. Consider taking profits.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center mr-3">
                          <BarChart size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Market Insight</h4>
                          <p className="text-sm text-muted-foreground">
                            Current market sentiment is {currentSentimentValue < 30 ? 'bearish' : 
                                              currentSentimentValue < 45 ? 'slightly bearish' : 
                                              currentSentimentValue < 55 ? 'neutral' : 
                                              currentSentimentValue < 70 ? 'slightly bullish' : 'bullish'}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'assets' && (
            <div className="crypto-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold">Asset</th>
                      <th className="px-4 py-3 text-right font-semibold">Balance</th>
                      <th className="px-4 py-3 text-right font-semibold">Price</th>
                      <th className="px-4 py-3 text-right font-semibold">Value</th>
                      <th className="px-4 py-3 text-right font-semibold">Profit/Loss</th>
                      <th className="px-4 py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioItems.map(item => {
                      const currentValue = item.amount * item.currentPrice;
                      const purchaseValue = item.amount * item.buyPrice;
                      const profitValue = currentValue - purchaseValue;
                      const profitPercentage = (profitValue / purchaseValue) * 100;
                      
                      return (
                        <tr key={item.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="mr-2 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold">{item.symbol.slice(0, 1)}</span>
                              </div>
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-muted-foreground">{item.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-medium">
                            {formatCryptoCurrency(item.amount, item.symbol)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {formatCurrency(item.currentPrice)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {formatCurrency(currentValue)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className={`flex items-center justify-end ${profitValue >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                              {profitValue >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                              <span>{formatCurrency(Math.abs(profitValue))}</span>
                              <span className="ml-1">({Math.abs(profitPercentage).toFixed(2)}%)</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end space-x-2">
                              <button className="px-2 py-1 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20">Trade</button>
                              <button className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded hover:bg-muted/70">Details</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'transactions' && (
            <div className="crypto-card">
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <BarChart size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Transactions Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Your transaction history will appear here once you start trading.
                </p>
                <button className="crypto-button">
                  Make Your First Trade
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
