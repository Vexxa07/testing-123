
import React, { useState } from 'react';
import { Calendar, ArrowDown, ArrowUp, Settings, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PriceChart from '../components/PriceChart';

// Mock cryptocurrency data
const cryptocurrencies = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 52387.42, change24h: 2.34, marketCap: 1032856742189, volume24h: 28945631087 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2843.15, change24h: -1.27, marketCap: 342897451023, volume24h: 15784562341 },
  { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', price: 456.78, change24h: 0.89, marketCap: 76542318906, volume24h: 2134567890 },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 124.56, change24h: 5.67, marketCap: 54327890123, volume24h: 3892145670 },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.4532, change24h: -2.12, marketCap: 15789012345, volume24h: 923456789 },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 6.78, change24h: 1.45, marketCap: 8456123789, volume24h: 512378945 },
  { id: 'ripple', name: 'XRP', symbol: 'XRP', price: 0.5123, change24h: -0.78, marketCap: 27891456320, volume24h: 1234789560 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.078, change24h: 3.21, marketCap: 11234567890, volume24h: 845612378 }
];

const timeRanges = [
  { label: '24h', value: '24h' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
  { label: '1y', value: '1y' }
];

const Charts = () => {
  const [selectedCoin, setSelectedCoin] = useState(cryptocurrencies[0]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d' | '1y'>('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  // Filter cryptocurrencies based on search term
  const filteredCoins = cryptocurrencies.filter(coin => {
    return coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };
  
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toFixed(2)}`;
  };
  
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Cryptocurrency Charts</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Coin List */}
            <div className="lg:col-span-1">
              <div className="crypto-card h-full">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search coins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  </div>
                </div>
                
                <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                  <ul className="space-y-1">
                    {filteredCoins.map(coin => (
                      <li key={coin.id}>
                        <button
                          onClick={() => setSelectedCoin(coin)}
                          className={`w-full px-3 py-2 rounded-md flex justify-between items-center transition-colors ${
                            selectedCoin.id === coin.id ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="mr-2 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold">{coin.symbol.slice(0, 1)}</span>
                            </div>
                            <span className="font-medium">{coin.name}</span>
                          </div>
                          <div className={coin.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}>
                            {coin.change24h >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Main Chart Area */}
            <div className="lg:col-span-3">
              <div className="crypto-card">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <div className="flex items-center">
                      <div className="mr-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">{selectedCoin.symbol.slice(0, 1)}</span>
                      </div>
                      <h2 className="text-2xl font-bold">{selectedCoin.name} ({selectedCoin.symbol})</h2>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <p className="text-xl font-semibold mr-3">
                        {formatPrice(selectedCoin.price)}
                      </p>
                      <div className={`flex items-center ${selectedCoin.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                        {selectedCoin.change24h >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        <span className="font-medium ml-1">{Math.abs(selectedCoin.change24h).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
                    <div className="flex border border-border rounded-md overflow-hidden">
                      {timeRanges.map(range => (
                        <button
                          key={range.value}
                          onClick={() => setTimeRange(range.value as any)}
                          className={`px-3 py-1 text-sm ${
                            timeRange === range.value ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={toggleSettings}
                      className="p-2 rounded-md border border-border hover:bg-secondary/50"
                    >
                      <Settings size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Chart settings */}
                {showSettings && (
                  <div className="mb-6 p-4 border border-border rounded-md bg-card animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Chart Type</label>
                        <select className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary">
                          <option>Line Chart</option>
                          <option>Candlestick Chart</option>
                          <option>OHLC Chart</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Indicators</label>
                        <select className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary">
                          <option>None</option>
                          <option>Moving Average</option>
                          <option>RSI</option>
                          <option>MACD</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Compare with</label>
                        <select className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary">
                          <option>None</option>
                          {cryptocurrencies.filter(c => c.id !== selectedCoin.id).map(coin => (
                            <option key={coin.id} value={coin.id}>{coin.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                
                <PriceChart 
                  coinId={selectedCoin.id}
                  coinName={selectedCoin.name}
                  timeRange={timeRange}
                />
                
                {/* Coin Information */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="crypto-card bg-secondary/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Market Cap</h3>
                    </div>
                    <p className="text-xl font-semibold">{formatMarketCap(selectedCoin.marketCap)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Rank: #1
                    </p>
                  </div>
                  
                  <div className="crypto-card bg-secondary/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Trading Volume (24h)</h3>
                    </div>
                    <p className="text-xl font-semibold">{formatMarketCap(selectedCoin.volume24h)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(selectedCoin.volume24h / selectedCoin.marketCap * 100).toFixed(2)}% of market cap
                    </p>
                  </div>
                  
                  <div className="crypto-card bg-secondary/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Circulating Supply</h3>
                    </div>
                    <p className="text-xl font-semibold">
                      {selectedCoin.id === 'bitcoin' 
                        ? '19,371,343 BTC' 
                        : selectedCoin.id === 'ethereum'
                        ? '120,219,872 ETH'
                        : '-- ' + selectedCoin.symbol}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedCoin.id === 'bitcoin' 
                        ? '92.2% of max supply' 
                        : selectedCoin.id === 'ethereum'
                        ? 'No max supply'
                        : '--'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Charts;
