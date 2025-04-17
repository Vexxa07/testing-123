
import React, { useState } from 'react';
import { Search, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';

// Mock news data
const newsData = [
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
  },
  {
    id: '4',
    title: 'DeFi Protocol Achieves $1 Billion in Total Value Locked',
    summary: 'The decentralized finance protocol has reached a significant milestone, with over $1 billion in assets now locked in its smart contracts.',
    date: 'May 8, 2023',
    category: 'DeFi',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e',
    readTime: 3,
    likes: 98
  },
  {
    id: '5',
    title: 'NFT Marketplace Launches New Creator-Focused Features',
    summary: 'The popular NFT marketplace has announced a suite of new features designed to empower creators and provide more earning opportunities.',
    date: 'May 5, 2023',
    category: 'NFT',
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d',
    readTime: 5,
    likes: 112
  },
  {
    id: '6',
    title: 'Major Payment Processor Adds Crypto Payment Options',
    summary: 'One of the world\'s largest payment processors has announced it will support cryptocurrency payments, marking a major step toward mainstream adoption.',
    date: 'May 3, 2023',
    category: 'Adoption',
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1',
    readTime: 4,
    likes: 167
  },
  {
    id: '7',
    title: 'Crypto Mining Farm Switches to 100% Renewable Energy',
    summary: 'A major cryptocurrency mining operation has completed its transition to using exclusively renewable energy sources, addressing environmental concerns.',
    date: 'May 1, 2023',
    category: 'Mining',
    imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335',
    readTime: 7,
    likes: 203
  },
  {
    id: '8',
    title: 'New Regulatory Framework for Crypto Assets Proposed',
    summary: 'Lawmakers have introduced a comprehensive regulatory framework aimed at providing clarity for cryptocurrency businesses while protecting consumers.',
    date: 'April 28, 2023',
    category: 'Regulation',
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3',
    readTime: 8,
    likes: 145
  },
  {
    id: '9',
    title: 'Cross-Chain Bridge Protocol Improves Security Measures',
    summary: 'Following several high-profile exploits, a popular cross-chain bridge protocol has implemented enhanced security measures to protect user funds.',
    date: 'April 25, 2023',
    category: 'Security',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    readTime: 6,
    likes: 89
  }
];

const categories = [
  'All',
  'Bitcoin',
  'Ethereum',
  'DeFi',
  'NFT',
  'Regulation',
  'Adoption',
  'Mining',
  'Security',
  'CBDC'
];

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Filter news based on search term and category
  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        news.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort filtered news
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? a.likes - b.likes : b.likes - a.likes;
    }
  });
  
  const toggleSort = (type: 'date' | 'likes') => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('desc');
    }
  };
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Latest Crypto News</h1>
          
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
              
              <button
                onClick={toggleFilters}
                className="md:hidden crypto-button flex items-center"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
              
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center">
                  <button
                    onClick={() => toggleSort('date')}
                    className="flex items-center px-3 py-2 rounded-md border border-border bg-background hover:bg-secondary/50"
                  >
                    <span className="text-sm font-medium mr-1">Date</span>
                    {sortBy === 'date' && (
                      sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />
                    )}
                  </button>
                </div>
                
                <div className="flex items-center">
                  <button
                    onClick={() => toggleSort('likes')}
                    className="flex items-center px-3 py-2 rounded-md border border-border bg-background hover:bg-secondary/50"
                  >
                    <span className="text-sm font-medium mr-1">Popularity</span>
                    {sortBy === 'likes' && (
                      sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile filters */}
            {filtersVisible && (
              <div className="md:hidden mt-4 p-4 border border-border rounded-md bg-card animate-fade-in">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSort('date')}
                        className={`flex items-center px-3 py-2 rounded-md border border-border bg-background flex-1 justify-center ${sortBy === 'date' ? 'border-primary text-primary' : ''}`}
                      >
                        <span className="text-sm font-medium mr-1">Date</span>
                        {sortBy === 'date' && (
                          sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />
                        )}
                      </button>
                      
                      <button
                        onClick={() => toggleSort('likes')}
                        className={`flex items-center px-3 py-2 rounded-md border border-border bg-background flex-1 justify-center ${sortBy === 'likes' ? 'border-primary text-primary' : ''}`}
                      >
                        <span className="text-sm font-medium mr-1">Popularity</span>
                        {sortBy === 'likes' && (
                          sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* News Results */}
          {sortedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedNews.map(news => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No news articles found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 crypto-button"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
