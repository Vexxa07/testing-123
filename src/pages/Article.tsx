
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ThumbsUp, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';

type ArticleParams = {
  id: string;
}

// Mock article data
const articleData = {
  '1': {
    id: '1',
    title: 'Bitcoin ETF Approval Sends Markets into Bull Run Territory',
    content: `
      <p>After years of anticipation, the Securities and Exchange Commission (SEC) has finally approved the first Bitcoin spot Exchange-Traded Fund (ETF), marking a significant milestone in the cryptocurrency industry's journey toward mainstream acceptance.</p>
      
      <p>The approval, which came after multiple rejected applications over the past five years, allows institutional investors easier access to the Bitcoin market without the need to directly hold the digital asset. This development is expected to bring billions of dollars of new investment into the cryptocurrency ecosystem.</p>
      
      <h2>Market Reaction</h2>
      
      <p>Following the announcement, Bitcoin's price surged by over 15% within 24 hours, briefly touching an all-time high above $68,000. The strong price action has led many analysts to suggest that crypto markets have officially entered "bull run territory."</p>
      
      <p>"This is the legitimization that many traditional investors were waiting for," said Jane Smith, Chief Crypto Strategist at Investment Capital. "The approval removes a significant barrier for institutional adoption and could potentially lead to a sustained bull market."</p>
      
      <p>The positive sentiment has also spread to other cryptocurrencies, with Ethereum, Solana, and many other altcoins seeing double-digit percentage gains.</p>
      
      <h2>Institutional Interest</h2>
      
      <p>Several major financial institutions have already expressed their intention to offer Bitcoin ETF products to their clients. Industry experts predict that the ETF could attract more than $50 billion in inflows during its first year.</p>
      
      <p>"We're seeing unprecedented interest from our institutional clients," reported Michael Johnson, Head of Digital Assets at Global Investments. "Many who were previously hesitant about cryptocurrencies are now actively exploring allocation strategies."</p>
      
      <h2>Regulatory Implications</h2>
      
      <p>The SEC's decision may have broader implications for cryptocurrency regulation. The approval suggests a shifting regulatory stance that could potentially lead to more cryptocurrency-based financial products receiving the green light in the future.</p>
      
      <p>Commissioner Elizabeth Warren stated, "While we maintain our commitment to investor protection, we also recognize the innovation and potential of blockchain technology. This approval reflects a balanced approach to regulation."</p>
      
      <h2>What's Next</h2>
      
      <p>Analysts are now looking ahead to potential Ethereum ETF approvals, which many believe could follow in the coming months. Additionally, the market is watching how central banks and other regulatory bodies worldwide might respond to this development.</p>
      
      <p>As institutional adoption increases, many experts predict that cryptocurrency volatility may gradually decrease, potentially making these assets more attractive to conservative investors and further driving mainstream adoption.</p>
      
      <p>Whether this ETF approval marks the beginning of a sustained bull market or simply a temporary price surge remains to be seen, but its historical significance for the cryptocurrency ecosystem is undeniable.</p>
    `,
    author: 'Alex Thompson',
    authorPosition: 'Senior Crypto Analyst',
    date: 'May 15, 2023',
    readTime: 5,
    category: 'Bitcoin',
    tags: ['Bitcoin', 'ETF', 'Regulation', 'Institutional Investment'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    likes: 234,
    comments: 56,
    shares: 89
  },
  '2': {
    id: '2',
    title: 'Ethereum Completes Major Upgrade, Gas Fees Drop by 90%',
    content: `
      <p>The long-awaited Ethereum upgrade has finally been completed, resulting in significantly lower transaction fees and improved scalability for the world's second-largest blockchain network.</p>
      
      <p>After months of testing and preparation, the upgrade was implemented through a hard fork that introduced several key improvements to the Ethereum network. Most notably, the changes have led to a dramatic reduction in gas fees, with average transaction costs dropping by approximately 90% compared to previous levels.</p>
      
      <h2>Technical Improvements</h2>
      
      <p>The upgrade introduces a more efficient transaction processing mechanism that optimizes how data is stored and accessed on the blockchain. By implementing advanced data sharding techniques and improved Layer 2 integration, the network can now handle a substantially higher volume of transactions without congestion.</p>
      
      <p>"This is the culmination of years of research and development," explained Vitalik Buterin, co-founder of Ethereum. "These improvements address the scalability trilemma in ways we couldn't before, making Ethereum more accessible while maintaining security and decentralization."</p>
      
      <h2>Impact on DeFi and NFTs</h2>
      
      <p>The decentralized finance (DeFi) and non-fungible token (NFT) sectors, which are heavily built on Ethereum infrastructure, have already begun seeing positive effects from the upgrade. Daily active users across major DeFi platforms have increased by over 35% in the week following the upgrade.</p>
      
      <p>"Lower gas fees mean more users can participate in DeFi protocols that were previously cost-prohibitive," noted Sarah Chen, founder of DeFi Analytics. "We're seeing users with smaller amounts of capital entering the ecosystem for the first time."</p>
      
      <p>NFT marketplaces have also reported a surge in transaction volume, with smaller-value NFTs becoming economically viable to trade again.</p>
      
      <h2>Market Response</h2>
      
      <p>Ethereum's price has responded positively to the successful implementation, rising approximately 25% since the upgrade was announced. However, analysts are more focused on the long-term implications for the ecosystem rather than short-term price movements.</p>
      
      <p>"This isn't just about price action," commented Robert Martinez, blockchain economist. "The reduced transaction costs fundamentally change Ethereum's utility and competitive position in the smart contract platform market."</p>
      
      <h2>Competitive Landscape</h2>
      
      <p>The upgrade comes at a critical time for Ethereum, which has faced increasing competition from alternative Layer 1 blockchains like Solana, Avalanche, and Cardano. Many of these competitors had gained market share by offering lower fees and higher transaction throughput.</p>
      
      <p>"Ethereum has effectively addressed its biggest weakness," said Thomas Wong, blockchain researcher. "While alternative chains still have their advantages, Ethereum's established ecosystem combined with these improvements makes it a formidable competitor again."</p>
      
      <h2>Looking Forward</h2>
      
      <p>The development team has already outlined the next phases of Ethereum's roadmap, which include further scalability improvements and enhanced privacy features. With this major upgrade successfully implemented, confidence in the team's ability to deliver on future promises has strengthened.</p>
      
      <p>For users and developers, the immediate benefit is clear: Ethereum is now significantly more usable for everyday transactions, opening up possibilities for applications that were previously impractical due to high costs.</p>
    `,
    author: 'Sophia Rodriguez',
    authorPosition: 'Blockchain Technology Reporter',
    date: 'May 12, 2023',
    readTime: 4,
    category: 'Ethereum',
    tags: ['Ethereum', 'Gas Fees', 'Scalability', 'DeFi', 'NFT'],
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    likes: 187,
    comments: 43,
    shares: 65
  },
  '3': {
    id: '3',
    title: 'Central Banks Globally Consider Digital Currency Options',
    content: `
      <p>More than 80% of central banks worldwide are now exploring the possibility of issuing their own digital currencies, according to a new comprehensive report released this week by the Bank for International Settlements (BIS).</p>
      
      <p>The report, which surveyed 81 central banks across developed and emerging economies, indicates a significant acceleration in Central Bank Digital Currency (CBDC) research and development compared to previous years. This trend represents a fundamental shift in how monetary authorities are approaching the digital transformation of finance.</p>
      
      <h2>Current State of CBDCs</h2>
      
      <p>Currently, only a handful of countries have launched functional CBDCs, with China's digital yuan (e-CNY) being the most advanced among major economies. The e-CNY has already been tested by millions of users across multiple cities and is being used for a growing range of payments and transactions.</p>
      
      <p>The Bahamas, Eastern Caribbean Central Bank, and Nigeria have also launched their digital currencies, while countries including Sweden, South Korea, and Japan are in advanced testing phases.</p>
      
      <p>"We're seeing a rapid evolution from theoretical research to practical implementation," noted Dr. Maria Gonzalez, senior economist at the BIS. "Many central banks have moved beyond asking 'if' they should develop a CBDC to questions of 'how' and 'when'."</p>
      
      <h2>Key Motivations</h2>
      
      <p>According to the report, central banks cite several primary motivations for pursuing CBDC development:</p>
      
      <ul>
        <li>Financial inclusion and providing access to digital payment systems for unbanked populations</li>
        <li>Improving payment system efficiency and reducing costs</li>
        <li>Ensuring monetary sovereignty in a rapidly digitalizing economy</li>
        <li>Countering the growth of private cryptocurrencies and stablecoins</li>
        <li>Creating more effective tools for monetary policy implementation</li>
      </ul>
      
      <p>"For developing economies, financial inclusion is often the primary driver," explained James Park, digital currency specialist. "For advanced economies, concerns about maintaining monetary control in an increasingly digital landscape tend to predominate."</p>
      
      <h2>Design Approaches</h2>
      
      <p>The report highlights significant diversity in how central banks are approaching CBDC design. Some are pursuing retail CBDCs (for use by the general public), while others focus on wholesale CBDCs (limited to financial institutions for interbank settlements).</p>
      
      <p>Privacy remains a critical concern, with most central banks seeking to balance transaction privacy with regulatory compliance and anti-money laundering requirements. Many are exploring tiered privacy models where smaller transactions receive greater privacy protections than larger ones.</p>
      
      <p>"The technical architecture choices are not merely technical—they're fundamentally about policy," said Emma Wilson, digital currency researcher. "How a CBDC is designed reflects a central bank's priorities regarding privacy, accessibility, and monetary control."</p>
      
      <h2>Implications for Cryptocurrencies</h2>
      
      <p>The increased interest in CBDCs has raised questions about potential impacts on existing cryptocurrencies and private stablecoins. Some analysts suggest CBDCs could reduce demand for cryptocurrencies, while others believe different digital assets will serve complementary roles.</p>
      
      <p>"We're likely to see a multi-currency digital future," predicted David Chen, cryptocurrency economist. "CBDCs will serve certain use cases related to everyday transactions and government interactions, while cryptocurrencies may continue to serve others, particularly where decentralization and censorship resistance are valued."</p>
      
      <h2>Looking Ahead</h2>
      
      <p>The report projects that more than 20 additional countries will launch CBDCs within the next three years, with the majority being retail CBDCs in emerging economies. Interoperability between different CBDCs is becoming an increasingly important focus, with several cross-border CBDC pilots already underway.</p>
      
      <p>As central banks move forward with these projects, the report emphasizes the need for continued public consultation and careful consideration of privacy implications, financial stability risks, and potential societal impacts of the transition to digital currencies.</p>
    `,
    author: 'Daniel Kim',
    authorPosition: 'Global Finance Correspondent',
    date: 'May 10, 2023',
    readTime: 6,
    category: 'CBDC',
    tags: ['CBDC', 'Central Banks', 'Digital Currency', 'Regulation'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    likes: 142,
    comments: 37,
    shares: 52
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

const Article = () => {
  const { id } = useParams<ArticleParams>();
  const [article, setArticle] = useState(null);
  
  useEffect(() => {
    // In a real app, we would fetch the article data from an API
    // For this demo, we'll use our mock data
    if (id && articleData[id]) {
      setArticle(articleData[id]);
      window.scrollTo(0, 0);
    }
  }, [id]);
  
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-6 text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
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
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/news" className="flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft size={16} className="mr-2" />
              Back to News
            </Link>
          </div>
          
          {/* Article Header */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="bg-primary px-3 py-1 rounded-full text-xs font-medium text-white">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{article.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp size={16} className="mr-1" />
                <span>{article.likes} likes</span>
              </div>
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-1" />
                <span>{article.comments} comments</span>
              </div>
            </div>
            
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <span className="font-semibold text-primary">{article.author.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium">{article.author}</p>
                <p className="text-sm text-muted-foreground">{article.authorPosition}</p>
              </div>
            </div>
          </div>
          
          {/* Article Hero Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <article className="prose max-w-none prose-headings:font-bold prose-headings:my-6 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-li:text-base">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </article>
              
              {/* Article Tags */}
              <div className="mt-8 mb-8">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-full text-sm bg-secondary/50 border border-border hover:bg-secondary cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Article Actions */}
              <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-secondary">
                    <ThumbsUp size={16} />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-secondary">
                    <MessageSquare size={16} />
                    <span>Comment</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-secondary">
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-secondary">
                    <Bookmark size={16} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              <div className="crypto-card">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map(article => (
                    <div key={article.id} className="flex items-start gap-3">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium line-clamp-2 hover:text-primary">
                          <Link to={`/news/${article.id}`}>{article.title}</Link>
                        </h4>
                        <p className="text-sm text-muted-foreground">{article.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="crypto-card">
                <h3 className="text-lg font-semibold mb-4">Subscribe to Updates</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest news and research delivered directly to your inbox.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button type="submit" className="crypto-button w-full">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
