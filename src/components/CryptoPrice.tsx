
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

// Mock data for demo
const mockData: CryptoCoin[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 52387.42, change24h: 2.34, marketCap: 1032856742189, volume24h: 28945631087 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2843.15, change24h: -1.27, marketCap: 342897451023, volume24h: 15784562341 },
  { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', price: 456.78, change24h: 0.89, marketCap: 76542318906, volume24h: 2134567890 },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 124.56, change24h: 5.67, marketCap: 54327890123, volume24h: 3892145670 },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.4532, change24h: -2.12, marketCap: 15789012345, volume24h: 923456789 },
];

const CryptoPrice = () => {
  const [coins, setCoins] = useState<CryptoCoin[]>(mockData);
  const [sortConfig, setSortConfig] = useState<{ key: keyof CryptoCoin, direction: 'ascending' | 'descending' } | null>(null);
  
  // Simulating price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() * 0.01 - 0.005)),
          change24h: coin.change24h + (Math.random() * 0.5 - 0.25)
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Sorting logic
  const requestSort = (key: keyof CryptoCoin) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedCoins = React.useMemo(() => {
    let sortableCoins = [...coins];
    if (sortConfig !== null) {
      sortableCoins.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCoins;
  }, [coins, sortConfig]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 4 : 2
    }).format(price);
  };
  
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toFixed(2)}`;
  };
  
  return (
    <div className="overflow-x-auto crypto-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left font-semibold" onClick={() => requestSort('name')}>
              Name {sortConfig?.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-3 text-right font-semibold" onClick={() => requestSort('price')}>
              Price {sortConfig?.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-3 text-right font-semibold" onClick={() => requestSort('change24h')}>
              24h Change {sortConfig?.key === 'change24h' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-3 text-right font-semibold hidden md:table-cell" onClick={() => requestSort('marketCap')}>
              Market Cap {sortConfig?.key === 'marketCap' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-3 text-right font-semibold hidden lg:table-cell" onClick={() => requestSort('volume24h')}>
              Volume (24h) {sortConfig?.key === 'volume24h' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin) => (
            <tr key={coin.id} className="border-b border-border hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="mr-2 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">{coin.symbol.slice(0, 1)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-right font-medium">
                {formatPrice(coin.price)}
              </td>
              <td className="px-4 py-3 text-right">
                <div className={`flex items-center justify-end ${coin.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                  {coin.change24h >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span>{Math.abs(coin.change24h).toFixed(2)}%</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right hidden md:table-cell text-muted-foreground">
                {formatMarketCap(coin.marketCap)}
              </td>
              <td className="px-4 py-3 text-right hidden lg:table-cell text-muted-foreground">
                {formatMarketCap(coin.volume24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPrice;
