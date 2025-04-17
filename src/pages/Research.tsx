
import React, { useState } from 'react';
import { Calendar, BookOpen, Filter, ArrowRight, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock research reports data
const researchData = [
  {
    id: '1',
    title: 'Bitcoin Halvening: Historical Impact and Future Projections',
    summary: 'An in-depth analysis of previous Bitcoin halvening events and their effects on price, mining economics, and market sentiment, with projections for the upcoming halvening.',
    date: 'May 12, 2023',
    author: 'Dr. Sarah Miller',
    category: 'Bitcoin',
    tags: ['Bitcoin', 'Halvening', 'Price Analysis'],
    readTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335',
    premium: true
  },
  {
    id: '2',
    title: 'DeFi 2.0: Evolution of Yield Aggregation and Risk Management',
    summary: 'An exploration of the second generation of DeFi protocols, focusing on innovations in yield optimization, risk tranching, and sustainable tokenomics.',
    date: 'May 5, 2023',
    author: 'Alex Johnson',
    category: 'DeFi',
    tags: ['DeFi', 'Yield Farming', 'Risk Management'],
    readTime: 12,
    imageUrl: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
    premium: false
  },
  {
    id: '3',
    title: 'Ethereum L2 Ecosystem: Comparative Analysis of Scaling Solutions',
    summary: 'A technical and economic comparison of major Ethereum Layer 2 scaling solutions, including optimistic rollups, ZK-rollups, and validiums.',
    date: 'April 28, 2023',
    author: 'Michael Chen',
    category: 'Ethereum',
    tags: ['Ethereum', 'Layer 2', 'Scaling'],
    readTime: 18,
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
    premium: true
  },
  {
    id: '4',
    title: 'Regulatory Landscape: Global Approaches to Crypto Asset Regulation',
    summary: 'A comprehensive review of cryptocurrency regulations across major jurisdictions, identifying trends and implications for market participants.',
    date: 'April 20, 2023',
    author: 'Emily Rodriguez',
    category: 'Regulation',
    tags: ['Regulation', 'Compliance', 'Policy'],
    readTime: 14,
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3',
    premium: false
  },
  {
    id: '5',
    title: 'NFT Market Dynamics: Beyond the Hype Cycle',
    summary: 'Analysis of NFT market fundamentals, user adoption patterns, and emerging use cases beyond digital art and collectibles.',
    date: 'April 15, 2023',
    author: 'Thomas Wright',
    category: 'NFT',
    tags: ['NFT', 'Digital Art', 'Market Analysis'],
    readTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d',
    premium: false
  },
  {
    id: '6',
    title: 'Stablecoin Architecture: Design Choices and Their Implications',
    summary: 'An examination of different stablecoin mechanisms, comparing collateralization strategies, price stability approaches, and governance models.',
    date: 'April 8, 2023',
    author: 'Dr. James Kim',
    category: 'Stablecoins',
    tags: ['Stablecoins', 'DeFi', 'Monetary Policy'],
    readTime: 16,
    imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307',
    premium: true
  }
];

const categories = [
  'All',
  'Bitcoin',
  'Ethereum',
  'DeFi',
  'NFT',
  'Regulation',
  'Stablecoins'
];

const Research = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Filter research reports based on search, category, and premium filter
  const filteredResearch = researchData.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    const matchesPremium = !showPremiumOnly || report.premium;
    
    return matchesSearch && matchesCategory && matchesPremium;
  });
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Research & Analysis</h1>
            <p className="text-muted-foreground">In-depth reports and analysis on cryptocurrency markets and blockchain technology.</p>
          </div>
          
          {/* Premium research banner */}
          <div className="mb-8 bg-gradient-to-r from-primary/90 to-primary/70 text-white rounded-lg overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full border-8 border-white/30"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full border-8 border-white/20"></div>
              </div>
              
              <div className="relative z-10 max-w-xl">
                <h2 className="text-2xl font-bold mb-2">Premium Research Access</h2>
                <p className="mb-4 text-white/90">
                  Get exclusive access to our in-depth research reports, market analysis, and expert insights with a premium subscription.
                </p>
                <button className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-white/90 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search research reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                />
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
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showPremiumOnly}
                    onChange={() => setShowPremiumOnly(!showPremiumOnly)}
                    className="mr-2 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Premium only</span>
                </label>
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
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showPremiumOnly}
                      onChange={() => setShowPremiumOnly(!showPremiumOnly)}
                      className="mr-2 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Premium only</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          
          {/* Research reports */}
          {filteredResearch.length > 0 ? (
            <div className="space-y-6">
              {filteredResearch.map(report => (
                <div key={report.id} className="crypto-card flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 h-48 md:h-auto rounded-md overflow-hidden">
                    <img 
                      src={report.imageUrl} 
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:w-3/4 flex flex-col">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-block px-2 py-1 bg-secondary text-xs font-medium rounded">
                          {report.category}
                        </span>
                        
                        {report.premium && (
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                            Premium
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 hover:text-primary">
                        <a href={`/research/${report.id}`}>{report.title}</a>
                      </h3>
                      
                      <p className="text-muted-foreground mb-4">{report.summary}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {report.tags.map(tag => (
                          <span key={tag} className="inline-block px-2 py-1 bg-secondary/50 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2">
                      <div className="flex items-center text-sm text-muted-foreground mb-2 sm:mb-0">
                        <div>By <span className="font-medium">{report.author}</span></div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{report.date}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <BookOpen size={14} className="mr-1" />
                          <span>{report.readTime} min read</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {report.premium ? (
                          <button className="crypto-button text-sm py-1">
                            Unlock Report
                          </button>
                        ) : (
                          <a 
                            href={`/research/${report.id}`}
                            className="crypto-button text-sm py-1"
                          >
                            Read Report
                          </a>
                        )}
                        
                        {report.premium && (
                          <button className="text-sm py-1 px-3 border border-border rounded-md flex items-center hover:bg-secondary/50">
                            <Download size={14} className="mr-1" />
                            PDF
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No research reports found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setShowPremiumOnly(false);
                }}
                className="mt-4 crypto-button"
              >
                Clear filters
              </button>
            </div>
          )}
          
          {/* Research topics section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Research Topics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="#" className="crypto-card hover:border-primary group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">Blockchain Technology</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Deep dives into blockchain architecture, consensus mechanisms, and technological advancements.
                </p>
                <div className="flex items-center text-primary">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              
              <a href="#" className="crypto-card hover:border-primary group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">Tokenomics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Analysis of token economic models, incentive structures, and sustainability frameworks.
                </p>
                <div className="flex items-center text-primary">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              
              <a href="#" className="crypto-card hover:border-primary group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">Market Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Data-driven insights into market trends, on-chain metrics, and macroeconomic factors.
                </p>
                <div className="flex items-center text-primary">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Research;
