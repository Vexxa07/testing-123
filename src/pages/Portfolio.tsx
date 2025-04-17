
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Plus, X, ArrowUp, ArrowDown, Trash2, Edit, DollarSign, Settings, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock cryptocurrency data
const availableCoins = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 52387.42, change24h: 2.34, priceHistory: generatePriceHistory(52000, 0.03) },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2843.15, change24h: -1.27, priceHistory: generatePriceHistory(2800, 0.04) },
  { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', price: 456.78, change24h: 0.89, priceHistory: generatePriceHistory(450, 0.035) },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 124.56, change24h: 5.67, priceHistory: generatePriceHistory(120, 0.045) },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.4532, change24h: -2.12, priceHistory: generatePriceHistory(0.45, 0.05) },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 6.78, change24h: 1.45, priceHistory: generatePriceHistory(6.5, 0.04) },
  { id: 'ripple', name: 'XRP', symbol: 'XRP', price: 0.5123, change24h: -0.78, priceHistory: generatePriceHistory(0.5, 0.035) },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.078, change24h: 3.21, priceHistory: generatePriceHistory(0.075, 0.06) }
];

// Helper function to generate price history
function generatePriceHistory(basePrice: number, volatility: number) {
  const history = [];
  let prevPrice = basePrice;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create a somewhat realistic price movement
    const randomFactor = Math.random() * volatility - volatility / 2;
    const trendFactor = Math.sin(i / 10) * (volatility / 2);
    const priceChange = prevPrice * (randomFactor + trendFactor);
    prevPrice = prevPrice + priceChange;
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: prevPrice
    });
  }
  
  return history;
}

// Default portfolio
const defaultPortfolio = [
  { coinId: 'bitcoin', amount: 0.5, buyPrice: 48000 },
  { coinId: 'ethereum', amount: 4.2, buyPrice: 3000 },
  { coinId: 'solana', amount: 15, buyPrice: 110 },
  { coinId: 'cardano', amount: 2000, buyPrice: 0.5 }
];

const COLORS = ['#0EA5E9', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newCoin, setNewCoin] = useState({ coinId: '', amount: '', buyPrice: '' });
  const [editingCoin, setEditingCoin] = useState({ index: -1, coinId: '', amount: '', buyPrice: '' });
  const [timeframe, setTimeframe] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Calculate portfolio value and performance
  const portfolioStats = React.useMemo(() => {
    let totalValue = 0;
    let totalInvestment = 0;
    let totalProfit = 0;
    
    portfolio.forEach(holding => {
      const coin = availableCoins.find(c => c.id === holding.coinId);
      if (coin) {
        const currentValue = coin.price * holding.amount;
        const investment = holding.buyPrice * holding.amount;
        
        totalValue += currentValue;
        totalInvestment += investment;
        totalProfit += (currentValue - investment);
      }
    });
    
    return {
      totalValue,
      totalInvestment,
      totalProfit,
      profitPercentage: totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0
    };
  }, [portfolio]);
  
  // Portfolio allocation data for the pie chart
  const allocationData = React.useMemo(() => {
    return portfolio.map(holding => {
      const coin = availableCoins.find(c => c.id === holding.coinId);
      const value = coin ? coin.price * holding.amount : 0;
      const percentage = portfolioStats.totalValue > 0 ? (value / portfolioStats.totalValue) * 100 : 0;
      
      return {
        name: coin?.name || 'Unknown',
        value,
        percentage
      };
    });
  }, [portfolio, portfolioStats.totalValue]);
  
  // Portfolio performance data for the area chart
  const performanceData = React.useMemo(() => {
    if (portfolio.length === 0) return [];
    
    // Get the last 30 days of data
    const days = 30;
    const data = [];
    
    for (let i = 0; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      const dateStr = date.toISOString().split('T')[0];
      
      let dayValue = 0;
      
      portfolio.forEach(holding => {
        const coin = availableCoins.find(c => c.id === holding.coinId);
        if (coin && coin.priceHistory) {
          // Find the closest date in the price history
          const historyPoint = coin.priceHistory.find(h => h.date === dateStr) || coin.priceHistory[coin.priceHistory.length - 1];
          dayValue += historyPoint.price * holding.amount;
        }
      });
      
      data.push({
        date: dateStr,
        value: dayValue
      });
    }
    
    return data;
  }, [portfolio]);
  
  // Handle add new coin form submission
  const handleAddCoin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const coinExists = portfolio.some(holding => holding.coinId === newCoin.coinId);
    if (coinExists) {
      alert('This coin is already in your portfolio. Please edit the existing entry instead.');
      return;
    }
    
    setPortfolio([...portfolio, {
      coinId: newCoin.coinId,
      amount: parseFloat(newCoin.amount),
      buyPrice: parseFloat(newCoin.buyPrice)
    }]);
    
    setNewCoin({ coinId: '', amount: '', buyPrice: '' });
    setShowAddForm(false);
  };
  
  // Handle edit coin form submission
  const handleEditCoin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedPortfolio = [...portfolio];
    updatedPortfolio[editingCoin.index] = {
      coinId: editingCoin.coinId,
      amount: parseFloat(editingCoin.amount),
      buyPrice: parseFloat(editingCoin.buyPrice)
    };
    
    setPortfolio(updatedPortfolio);
    setShowEditForm(false);
  };
  
  // Start editing a coin
  const startEditCoin = (index: number) => {
    const holding = portfolio[index];
    setEditingCoin({
      index,
      coinId: holding.coinId,
      amount: holding.amount.toString(),
      buyPrice: holding.buyPrice.toString()
    });
    setShowEditForm(true);
  };
  
  // Remove a coin from the portfolio
  const removeCoin = (index: number) => {
    if (window.confirm('Are you sure you want to remove this coin from your portfolio?')) {
      const updatedPortfolio = [...portfolio];
      updatedPortfolio.splice(index, 1);
      setPortfolio(updatedPortfolio);
    }
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Simulate refreshing portfolio data
  const refreshData = () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Slightly adjust prices to simulate real-time updates
      setPortfolio(prev => 
        prev.map(holding => ({
          ...holding,
          // Simulate a small random price movement
          buyPrice: holding.buyPrice * (1 + (Math.random() * 0.002 - 0.001))
        }))
      );
      
      setIsRefreshing(false);
    }, 1500);
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded shadow-lg">
          <p className="text-sm font-medium">
            {new Date(payload[0].payload.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </p>
          <p className="text-base font-semibold text-primary">
            {formatCurrency(payload[0].value)}
          </p>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Portfolio Tracker</h1>
              <p className="text-muted-foreground">Track and analyze your cryptocurrency investments</p>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={refreshData}
                className="flex items-center px-3 py-2 rounded-md border border-border hover:bg-secondary/50"
                disabled={isRefreshing}
              >
                <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="crypto-button flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Asset
              </button>
            </div>
          </div>
          
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="crypto-card">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Value</h3>
              <p className="text-2xl font-bold">{formatCurrency(portfolioStats.totalValue)}</p>
            </div>
            
            <div className="crypto-card">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Investment</h3>
              <p className="text-2xl font-bold">{formatCurrency(portfolioStats.totalInvestment)}</p>
            </div>
            
            <div className="crypto-card">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Profit/Loss</h3>
              <p className={`text-2xl font-bold ${portfolioStats.totalProfit >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                {portfolioStats.totalProfit >= 0 ? '+' : ''}{formatCurrency(portfolioStats.totalProfit)}
              </p>
            </div>
            
            <div className="crypto-card">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Profit Percentage</h3>
              <div className="flex items-center">
                <p className={`text-2xl font-bold ${portfolioStats.profitPercentage >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                  {portfolioStats.profitPercentage >= 0 ? '+' : ''}{portfolioStats.profitPercentage.toFixed(2)}%
                </p>
                {portfolioStats.profitPercentage >= 0 ? 
                  <ArrowUp className="ml-2 text-crypto-green" size={20} /> : 
                  <ArrowDown className="ml-2 text-crypto-red" size={20} />
                }
              </div>
            </div>
          </div>
          
          {/* Portfolio Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="crypto-card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Portfolio Performance</h2>
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
                </div>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0EA5E9"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="crypto-card">
              <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
              <div className="h-72 flex justify-center items-center">
                {allocationData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                        labelLine={false}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [formatCurrency(value), 'Value']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Add assets to see your allocation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Portfolio Holdings */}
          <div className="crypto-card mb-8">
            <h2 className="text-xl font-semibold mb-6">Your Holdings</h2>
            
            {portfolio.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left">Asset</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-right">24h</th>
                      <th className="px-4 py-3 text-right">Holdings</th>
                      <th className="px-4 py-3 text-right">Avg Buy</th>
                      <th className="px-4 py-3 text-right">Value</th>
                      <th className="px-4 py-3 text-right">Profit/Loss</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((holding, index) => {
                      const coin = availableCoins.find(c => c.id === holding.coinId);
                      if (!coin) return null;
                      
                      const currentValue = coin.price * holding.amount;
                      const investment = holding.buyPrice * holding.amount;
                      const profit = currentValue - investment;
                      const profitPercentage = investment > 0 ? (profit / investment) * 100 : 0;
                      
                      return (
                        <tr key={index} className="border-b border-border hover:bg-secondary/20">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="mr-2 w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold">{coin.symbol.slice(0, 1)}</span>
                              </div>
                              <div>
                                <div className="font-medium">{coin.name}</div>
                                <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-medium">
                            {formatCurrency(coin.price)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={coin.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}>
                              {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="font-medium">{holding.amount.toLocaleString(undefined, { maximumFractionDigits: 8 })}</div>
                            <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            {formatCurrency(holding.buyPrice)}
                          </td>
                          <td className="px-4 py-3 text-right font-medium">
                            {formatCurrency(currentValue)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className={`font-medium ${profit >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                              {profit >= 0 ? '+' : ''}{formatCurrency(profit)}
                            </div>
                            <div className={`text-xs ${profit >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                              {profit >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => startEditCoin(index)}
                                className="p-1 hover:bg-secondary rounded"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => removeCoin(index)}
                                className="p-1 hover:bg-secondary rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Your portfolio is empty. Add some assets to get started.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="crypto-button flex items-center mx-auto"
                >
                  <Plus size={16} className="mr-2" />
                  Add Asset
                </button>
              </div>
            )}
          </div>
          
          {/* Portfolio Recommendations */}
          <div className="crypto-card">
            <h2 className="text-xl font-semibold mb-4">Portfolio Recommendations</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-md">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-primary/10 rounded-full p-2">
                    <Settings size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Portfolio Diversification</h3>
                    <p className="text-sm text-muted-foreground">
                      Your portfolio is {portfolio.length < 3 ? 'not very diversified' : 'well diversified'}.
                      {portfolio.length < 3 
                        ? ' Consider adding assets from different categories to reduce risk.' 
                        : ' A diversified portfolio can help mitigate risk during market volatility.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-secondary/30 rounded-md">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-primary/10 rounded-full p-2">
                    <DollarSign size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Cost Averaging</h3>
                    <p className="text-sm text-muted-foreground">
                      Consider implementing a regular investment strategy for your top-performing assets. 
                      Dollar-cost averaging can help reduce the impact of volatility over time.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-secondary/30 rounded-md">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-primary/10 rounded-full p-2">
                    <TrendingUp size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Market Trend</h3>
                    <p className="text-sm text-muted-foreground">
                      The current market sentiment is {currentSentiment > 60 ? 'bullish' : currentSentiment > 40 ? 'neutral' : 'bearish'}.
                      {currentSentiment > 60 
                        ? ' Consider taking some profits from your highest-performing assets.'
                        : currentSentiment > 40 
                        ? ' Monitor the market closely for potential entry or exit points.'
                        : ' This may be a good time to dollar-cost average into your strongest conviction holdings.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Add Asset Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Asset</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-1 rounded-full hover:bg-secondary/50"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddCoin}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Asset</label>
                  <select
                    value={newCoin.coinId}
                    onChange={(e) => setNewCoin({...newCoin, coinId: e.target.value})}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  >
                    <option value="">Select a cryptocurrency</option>
                    {availableCoins.map(coin => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name} ({coin.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    value={newCoin.amount}
                    onChange={(e) => setNewCoin({...newCoin, amount: e.target.value})}
                    placeholder="Enter amount"
                    step="any"
                    min="0"
                    className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Average Buy Price (USD)</label>
                  <input
                    type="number"
                    value={newCoin.buyPrice}
                    onChange={(e) => setNewCoin({...newCoin, buyPrice: e.target.value})}
                    placeholder="Enter average buy price"
                    step="any"
                    min="0"
                    className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-border rounded-md hover:bg-secondary/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="crypto-button"
                  >
                    Add Asset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Asset Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Asset</h2>
              <button 
                onClick={() => setShowEditForm(false)}
                className="p-1 rounded-full hover:bg-secondary/50"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditCoin}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Asset</label>
                  <select
                    value={editingCoin.coinId}
                    onChange={(e) => setEditingCoin({...editingCoin, coinId: e.target.value})}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                    disabled // Don't allow changing the coin, only the amount and buy price
                  >
                    {availableCoins.map(coin => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name} ({coin.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    value={editingCoin.amount}
                    onChange={(e) => setEditingCoin({...editingCoin, amount: e.target.value})}
                    placeholder="Enter amount"
                    step="any"
                    min="0"
                    className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Average Buy Price (USD)</label>
                  <input
                    type="number"
                    value={editingCoin.buyPrice}
                    onChange={(e) => setEditingCoin({...editingCoin, buyPrice: e.target.value})}
                    placeholder="Enter average buy price"
                    step="any"
                    min="0"
                    className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="px-4 py-2 border border-border rounded-md hover:bg-secondary/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="crypto-button"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Portfolio;
