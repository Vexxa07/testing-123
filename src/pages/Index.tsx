
import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Newspaper, BarChart4, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CryptoPrice from '../components/CryptoPrice';
import NewsCard from '../components/NewsCard';
import PriceChart from '../components/PriceChart';
import SentimentGauge from '../components/SentimentGauge';

// Mock news data
const featuredNews = [
  {
    id: '1',
    title: 'Bitcoin ETF Approval Sends Markets into Bull Run Territory',
    summary: 'After years of anticipation, the SEC has finally approved the first Bitcoin spot ETF, allowing institutional investors easier access to the crypto market.',
    date: 'May 15, 2023',
    category: 'Bitcoin',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    readTime: 5,
    likes: 234
  },
  {
    id: '2',
    title: 'Ethereum Completes Major Upgrade, Gas Fees Drop by 90%',
    summary: 'The long-awaited Ethereum upgrade has finally been completed, resulting in significantly lower transaction fees and improved scalability.',
    date: 'May 12, 2023',
    category: 'Ethereum',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    readTime: 4,
    likes: 187
  },
  {
    id: '3',
    title: 'Central Banks Globally Consider Digital Currency Options',
    summary: 'More than 80% of central banks worldwide are now exploring the possibility of issuing their own digital currencies, according to a new report.',
    date: 'May 10, 2023',
    category: 'CBDC',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    readTime: 6,
    likes: 142
  }
];

const Index = () => {
  const [marketSentiment, setMarketSentiment] = useState(65);
  
  // Simulating slight changes in market sentiment
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketSentiment(prev => {
        const change = Math.random() * 2 - 1; // Random value between -1 and 1
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 0), 100); // Keep value between 0 and 100
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-crypto-navy to-primary/90 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="animate-slide-up">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Stay Ahead in the Crypto World</h1>
                <p className="text-lg md:text-xl mb-8 max-w-lg opacity-90">
                  Get the latest news, research, and market insights to make informed decisions in the fast-paced world of cryptocurrency.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/news" className="crypto-button bg-white text-primary hover:bg-white/90">
                    Latest News
                  </Link>
                  <Link to="/charts" className="crypto-button bg-transparent border border-white hover:bg-white/10">
                    View Charts
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <div className="relative w-96 h-96">
                  {/* Animated crypto symbols */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="text-[200px] font-bold">₿</div>
                  </div>
                  <div className="absolute top-1/4 right-1/4 animate-pulse-slow">
                    <div className="text-[50px] font-bold">Ξ</div>
                  </div>
                  <div className="absolute bottom-1/3 left-1/3 animate-pulse-slow animation-delay-500">
                    <div className="text-[40px] font-bold">₮</div>
                  </div>
                  <div className="absolute top-1/2 right-1/3 animate-pulse-slow animation-delay-1000">
                    <div className="text-[30px] font-bold">◎</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Market Overview Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Market Overview</h2>
              <Link to="/charts" className="flex items-center text-primary hover:underline">
                <span>View all markets</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <CryptoPrice />
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PriceChart 
                  coinId="bitcoin"
                  coinName="Bitcoin"
                  timeRange="7d"
                />
              </div>
              
              <div className="crypto-card">
                <h3 className="text-xl font-semibold mb-4">Market Sentiment</h3>
                <div className="flex justify-center mb-4">
                  <SentimentGauge value={marketSentiment} size="lg" />
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  The Fear & Greed Index measures market sentiment from 0 (Extreme Fear) to 100 (Extreme Greed).
                </p>
                <Link to="/sentiment" className="crypto-button w-full">
                  View detailed analysis
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured News Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured News</h2>
              <Link to="/news" className="flex items-center text-primary hover:underline">
                <span>View all news</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.map(news => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12">Why Choose CryptoWave</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="crypto-card text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
                <p className="text-sm text-muted-foreground">
                  Stay updated with real-time cryptocurrency prices and market movements.
                </p>
              </div>
              
              <div className="crypto-card text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Newspaper className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Access in-depth research and analysis from crypto experts.
                </p>
              </div>
              
              <div className="crypto-card text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart4 className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Advanced Charts</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize market trends with our interactive charting tools.
                </p>
              </div>
              
              <div className="crypto-card text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Alerts & Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Get timely alerts for important market movements and news.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="mb-6">
                Subscribe to our newsletter to receive the latest crypto news, research, and market insights directly in your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
