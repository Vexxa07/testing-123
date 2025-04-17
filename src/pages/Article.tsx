
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ThumbsUp, Share, Bookmark, ArrowLeft, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';

// Mock article content
const articleContent = {
  '1': {
    title: 'Bitcoin ETF Approval Sends Markets into Bull Run Territory',
    content: `
      <p class="lead">After years of anticipation, the SEC has finally approved the first Bitcoin spot ETF, allowing institutional investors easier access to the crypto market.</p>
      
      <p>In a landmark decision that has sent shockwaves through the financial world, the U.S. Securities and Exchange Commission (SEC) has given the green light to the first-ever Bitcoin spot Exchange-Traded Fund (ETF). This approval marks the culmination of a long and arduous journey for the cryptocurrency industry, which has been seeking regulatory validation for its flagship asset.</p>
      
      <h2>A New Era for Institutional Investment</h2>
      
      <p>The approval of a Bitcoin spot ETF represents a watershed moment for cryptocurrency as an asset class. Unlike previously approved Bitcoin futures ETFs, a spot ETF directly holds the underlying asset, providing investors with a more direct exposure to Bitcoin's price movements without the need to manage private keys or navigate complex cryptocurrency exchanges.</p>
      
      <p>"This is what the industry has been waiting for," said Jane Smith, chief crypto strategist at Global Investment Partners. "A spot ETF significantly lowers the barrier to entry for institutional investors who have been hesitant to directly engage with cryptocurrency markets due to regulatory uncertainty, custody concerns, and operational complexities."</p>
      
      <p>Market analysts predict that the ETF could attract billions of dollars in inflows in its first few months, potentially driving Bitcoin's price to new all-time highs. The immediate market reaction has been decidedly positive, with Bitcoin surging more than 15% within hours of the announcement.</p>
      
      <h2>Regulatory Shift</h2>
      
      <p>The SEC's decision signals a significant shift in the regulatory approach to digital assets. For years, the commission had rejected numerous Bitcoin ETF applications, citing concerns about market manipulation, liquidity, and investor protection. The approval suggests that regulators have become more comfortable with the maturity and resilience of Bitcoin markets.</p>
      
      <p>In its decision, the SEC highlighted several factors that influenced its change of stance, including:</p>
      
      <ul>
        <li>Improved market surveillance and cooperation between crypto exchanges and traditional financial markets</li>
        <li>Enhanced custody solutions with institutional-grade security</li>
        <li>Greater market liquidity and depth</li>
        <li>More robust pricing mechanisms across multiple trading venues</li>
      </ul>
      
      <h2>Market Impact and Outlook</h2>
      
      <p>The immediate market response has been electric, with Bitcoin breaking through key resistance levels and altcoins following suit in what traders are describing as the beginning of a potential bull run. Trading volumes across major exchanges have surged to levels not seen since the 2021 bull market peak.</p>
      
      <p>Institutional investors who had been sitting on the sidelines are now reportedly accelerating their digital asset strategies. Several major asset managers have already filed for their own Bitcoin ETF products, suggesting that competition in this space will heat up quickly.</p>
      
      <p>"We're seeing unprecedented interest from our institutional clients," reported Michael Johnson, head of digital assets at a major Wall Street bank. "Many who were previously restricted from direct cryptocurrency investment are now able to gain exposure through regulated ETF vehicles."</p>
      
      <h2>Looking Ahead</h2>
      
      <p>While the approval represents a major milestone for the cryptocurrency industry, experts caution that it's just one step in the ongoing integration of digital assets into the broader financial system. Questions remain about future regulatory actions regarding other cryptocurrencies and decentralized finance applications.</p>
      
      <p>Nevertheless, the Bitcoin ETF approval has undoubtedly opened the floodgates for greater institutional participation in cryptocurrency markets, potentially ushering in a new phase of adoption and price discovery for Bitcoin and the wider digital asset ecosystem.</p>
      
      <p>As one industry veteran put it: "Today marks the day when Bitcoin truly became an institutional asset class. The implications will unfold for years to come."</p>
    `,
    author: {
      name: 'Michael Richards',
      role: 'Senior Crypto Analyst',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    date: 'May 15, 2023',
    category: 'Bitcoin',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    readTime: 5,
    likes: 234
  },
  '2': {
    title: 'Ethereum Completes Major Upgrade, Gas Fees Drop by 90%',
    content: `
      <p class="lead">The long-awaited Ethereum upgrade has finally been completed, resulting in significantly lower transaction fees and improved scalability.</p>
      
      <p>In a development that has been years in the making, the Ethereum network has successfully implemented its most significant technical upgrade to date. The upgrade, which introduces a suite of improvements to the blockchain's infrastructure, has already resulted in a dramatic 90% reduction in transaction fees (known as "gas fees" in the Ethereum ecosystem).</p>
      
      <h2>A Solution to Ethereum's Scaling Challenge</h2>
      
      <p>For years, Ethereum has faced criticism for its high transaction costs during periods of network congestion. These fees have sometimes reached prohibitively expensive levels, pricing out smaller users and limiting the network's utility for everyday transactions. The upgrade addresses this fundamental limitation through a combination of technical innovations.</p>
      
      <p>"This upgrade represents the culmination of years of research and development," said Vitalik Buterin, co-founder of Ethereum. "It's designed to make Ethereum more accessible to everyone by dramatically reducing costs while maintaining the security and decentralization that makes blockchain technology valuable."</p>
      
      <h2>Technical Improvements</h2>
      
      <p>The upgrade includes several key technical components:</p>
      
      <ul>
        <li>Implementation of a more efficient transaction processing mechanism</li>
        <li>Improvements to the network's data storage and retrieval systems</li>
        <li>Enhanced security features to protect against potential attacks</li>
        <li>Optimizations for smart contract execution</li>
      </ul>
      
      <p>Together, these changes allow the network to process significantly more transactions per second without requiring users to pay higher fees to prioritize their transactions during periods of congestion.</p>
      
      <h2>Market and Ecosystem Impact</h2>
      
      <p>The immediate impact has been most noticeable in Ethereum's decentralized finance (DeFi) and NFT ecosystems, where activities that previously cost tens or even hundreds of dollars in transaction fees can now be conducted for just a few dollars or less.</p>
      
      <p>"We've seen a 300% increase in transaction volume on our protocol since the upgrade," reported Sarah Chen, founder of a popular DeFi application. "Users who were priced out of the market are returning, and we're seeing new users who were previously hesitant due to high fees."</p>
      
      <p>The upgrade has also had a positive effect on Ethereum's market position, with its price appreciating significantly as investors react to the improved technical fundamentals.</p>
      
      <h2>Looking Forward</h2>
      
      <p>While the current upgrade represents a major milestone, the Ethereum development community emphasizes that this is just one step in an ongoing roadmap of improvements. Future upgrades are planned to further enhance the network's capacity, security, and user experience.</p>
      
      <p>For now, however, users across the Ethereum ecosystem are celebrating the dramatic reduction in transaction costs, which opens up new possibilities for applications and use cases that were previously impractical due to economic constraints.</p>
      
      <p>"This is what mainstream adoption looks like," commented one developer. "When technology becomes cheap enough and fast enough that you don't have to think about the underlying infrastructure – that's when you know you've built something that can reach billions of users."</p>
    `,
    author: {
      name: 'Sarah Johnson',
      role: 'Blockchain Developer',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    date: 'May 12, 2023',
    category: 'Ethereum',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    readTime: 4,
    likes: 187
  },
  '3': {
    title: 'Central Banks Globally Consider Digital Currency Options',
    content: `
      <p class="lead">More than 80% of central banks worldwide are now exploring the possibility of issuing their own digital currencies, according to a new report.</p>
      
      <p>A comprehensive survey conducted by the Bank for International Settlements (BIS) has revealed that the vast majority of central banks around the world are actively researching and developing central bank digital currencies (CBDCs). This represents a significant acceleration in interest compared to just five years ago, when fewer than 30% of central banks were exploring digital currencies.</p>
      
      <h2>The CBDC Race Intensifies</h2>
      
      <p>The surge in CBDC development comes as central banks respond to the growing digitalization of economies, the declining use of physical cash in many countries, and the emergence of private cryptocurrencies and stablecoins that could potentially challenge monetary sovereignty.</p>
      
      <p>"We are witnessing a fundamental shift in how central banks view digital currencies," explained Dr. Robert Chen, a monetary policy expert. "What was once considered experimental technology is now seen as a strategic imperative by many monetary authorities."</p>
      
      <p>According to the report, 26 central banks have now progressed to advanced stages of CBDC development, with pilot programs either active or scheduled to launch within the next 12 months. An additional 62 central banks are in the research and proof-of-concept phase.</p>
      
      <h2>Different Approaches and Designs</h2>
      
      <p>The report highlights significant variations in how different countries are approaching CBDC design and implementation. The key differences include:</p>
      
      <ul>
        <li>Retail vs. wholesale focus: Some central banks are prioritizing consumer-facing digital currencies, while others are focusing on interbank and settlement systems</li>
        <li>Technology choices: Various distributed ledger technologies are being tested alongside more traditional centralized database approaches</li>
        <li>Privacy considerations: Different balances are being struck between user privacy and regulatory oversight capabilities</li>
        <li>Interest-bearing features: Some CBDC designs include the ability to pay interest, potentially creating a new monetary policy tool</li>
      </ul>
      
      <p>The People's Bank of China remains the clear leader among major economies, with its digital yuan already being tested by millions of users across multiple cities. The European Central Bank has accelerated its digital euro project, while the Federal Reserve has adopted a more cautious approach, though it recently published a discussion paper outlining potential CBDC designs.</p>
      
      <h2>Implications for Cryptocurrency Markets</h2>
      
      <p>The rapid advancement of CBDC projects has complex implications for existing cryptocurrency markets. On one hand, CBDCs validate the concept of digital currencies and could accelerate broader adoption of digital wallets and payment systems, potentially benefiting the crypto ecosystem as a whole.</p>
      
      <p>On the other hand, government-backed digital currencies could compete directly with certain cryptocurrencies, particularly those focused on payments and medium of exchange use cases. Stablecoins may face especially direct competition, along with potential regulatory restrictions.</p>
      
      <p>"We're entering an era where multiple forms of money will coexist in the digital realm," said Maria Garcia, chief economist at a major cryptocurrency exchange. "CBDCs will serve certain functions well, but they won't eliminate the need for decentralized cryptocurrencies that offer features like programmability, censorship-resistance, and global accessibility without requiring permission."</p>
      
      <h2>Looking Ahead</h2>
      
      <p>The BIS report predicts that by 2025, more than 20 CBDCs will be in public use, representing economies that together account for over 50% of global GDP. This rapid timeline suggests that the monetary landscape is set to undergo its most significant transformation since the end of the Bretton Woods system in the early 1970s.</p>
      
      <p>For individuals, businesses, and financial institutions, preparing for this new multi-currency digital future will require education, strategic planning, and adaptability as the boundaries between traditional and digital finance continue to blur.</p>
    `,
    author: {
      name: 'Daniel Thompson',
      role: 'Financial Technology Reporter',
      imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    date: 'May 10, 2023',
    category: 'CBDC',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    readTime: 6,
    likes: 142
  }
};

// Mock related articles
const relatedArticles = [
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
  }
];

interface ArticleParams {
  id: string;
}

const Article = () => {
  const { id } = useParams<ArticleParams>();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  // Simulate fetching article data
  useEffect(() => {
    const fetchArticle = async () => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (id && articleContent[id as keyof typeof articleContent]) {
        setArticle(articleContent[id as keyof typeof articleContent]);
      }
      
      setIsLoading(false);
    };
    
    fetchArticle();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted/50 rounded w-3/4"></div>
            <div className="h-6 bg-muted/50 rounded w-1/2"></div>
            <div className="h-64 bg-muted/50 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted/50 rounded"></div>
              <div className="h-4 bg-muted/50 rounded"></div>
              <div className="h-4 bg-muted/50 rounded w-5/6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/news" className="crypto-button">
              <ArrowLeft size={16} className="mr-2" />
              Back to News
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <article className="container mx-auto px-4 md:px-6 py-8">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <Link to="/news" className="flex items-center text-primary hover:underline">
              <ArrowLeft size={16} className="mr-2" />
              Back to News
            </Link>
          </div>
          
          {/* Article header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <img
                  src={article.author.imageUrl}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground">{article.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="flex items-center mr-4">
                  <Calendar size={16} className="mr-1" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Featured image */}
          <div className="mb-8">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
          
          {/* Article content */}
          <div 
            className="prose prose-lg max-w-none dark:prose-invert mb-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Article actions */}
          <div className="border-t border-b border-border py-4 my-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  liked ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                }`}
              >
                <ThumbsUp size={18} fill={liked ? 'currentColor' : 'none'} />
                <span>{liked ? article.likes + 1 : article.likes}</span>
              </button>
              
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  bookmarked ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                }`}
              >
                <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
                <span>Save</span>
              </button>
            </div>
            
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary"
              onClick={() => {
                navigator.share ? 
                  navigator.share({
                    title: article.title,
                    text: article.summary,
                    url: window.location.href
                  }).catch(err => console.error('Error sharing:', err)) : 
                  alert('Share functionality not supported in this browser');
              }}
            >
              <Share size={18} />
              <span>Share</span>
            </button>
          </div>
          
          {/* Author bio */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <img
                src={article.author.imageUrl}
                alt={article.author.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{article.author.name}</h3>
                <p className="text-muted-foreground">{article.author.role}</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              An experienced financial analyst and writer specializing in blockchain technology and cryptocurrency markets. 
              With over a decade of experience in financial markets and technology reporting, they provide insightful analysis 
              of market trends and technological developments.
            </p>
          </div>
          
          {/* Related articles */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(article => (
                <NewsCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
