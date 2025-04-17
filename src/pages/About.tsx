
import React from 'react';
import { Mail, Phone, MessageSquare, GithubIcon, TwitterIcon, LinkedinIcon, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-crypto-navy to-primary/90 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About CryptoWave Insight Hub</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Your trusted source for cryptocurrency news, research, and market insights, empowering you to make informed decisions in the digital asset space.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                At CryptoWave Insight Hub, we're dedicated to cutting through the noise in the cryptocurrency market to provide you with accurate, timely, and insightful information. Our mission is to empower both new and experienced investors with the knowledge they need to navigate the complex world of digital assets.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that access to high-quality information should be accessible to everyone, regardless of their experience level. That's why we strive to present complex concepts in an understandable way, while still providing the depth and analysis that sophisticated investors demand.
              </p>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="crypto-card text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-Time Market Data</h3>
                <p className="text-muted-foreground">
                  Access up-to-the-minute cryptocurrency prices, charts, and market trends to stay ahead of market movements.
                </p>
              </div>
              
              <div className="crypto-card text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Analysis & Research</h3>
                <p className="text-muted-foreground">
                  Benefit from in-depth reports and analysis from our team of experienced researchers and market analysts.
                </p>
              </div>
              
              <div className="crypto-card text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Breaking News & Updates</h3>
                <p className="text-muted-foreground">
                  Stay informed with the latest developments in the cryptocurrency and blockchain space as they happen.
                </p>
              </div>
              
              <div className="crypto-card text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Market Sentiment Analysis</h3>
                <p className="text-muted-foreground">
                  Understand the emotional state of the market with our proprietary sentiment indicators and social metrics.
                </p>
              </div>
              
              <div className="crypto-card text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">5</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Portfolio Management Tools</h3>
                <p className="text-muted-foreground">
                  Track your investments, analyze performance, and identify opportunities with our portfolio management tools.
                </p>
              </div>
              
              <div className="crypto-card text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">6</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Educational Resources</h3>
                <p className="text-muted-foreground">
                  Learn about blockchain technology, cryptocurrencies, and investment strategies through our educational content.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="crypto-card text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">Michael Richards</h3>
                <p className="text-primary mb-3">CEO & Founder</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Former investment banker with over 10 years of experience in financial markets and blockchain technology.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <TwitterIcon size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <LinkedinIcon size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <GithubIcon size={18} />
                  </a>
                </div>
              </div>
              
              <div className="crypto-card text-center">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <p className="text-primary mb-3">Head of Research</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Blockchain researcher with a background in computer science and economics, specializing in DeFi and crypto economics.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <TwitterIcon size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <LinkedinIcon size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <GithubIcon size={18} />
                  </a>
                </div>
              </div>
              
              <div className="crypto-card text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/67.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">Daniel Thompson</h3>
                <p className="text-primary mb-3">Lead Analyst</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Experienced market analyst with expertise in technical analysis and macroeconomic trends affecting cryptocurrency markets.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <TwitterIcon size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <LinkedinIcon size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <GithubIcon size={18} />
                  </a>
                </div>
              </div>
              
              <div className="crypto-card text-center">
                <img
                  src="https://randomuser.me/api/portraits/women/28.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">Emily Zhang</h3>
                <p className="text-primary mb-3">Editor-in-Chief</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Journalist with over 8 years of experience covering technology and finance for major publications.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <TwitterIcon size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <LinkedinIcon size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <GithubIcon size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="crypto-card h-full">
                  <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Email</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows={5}
                        className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="crypto-button w-full">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              
              <div>
                <div className="crypto-card h-full">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MapPin className="text-primary" size={20} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Our Location</h4>
                        <p className="text-muted-foreground">
                          123 Blockchain Avenue, Suite 101<br />
                          San Francisco, CA 94107<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Mail className="text-primary" size={20} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Email Us</h4>
                        <p className="text-muted-foreground">
                          General Inquiries:<br />
                          <a href="mailto:info@cryptowave.com" className="text-primary hover:underline">info@cryptowave.com</a>
                        </p>
                        <p className="text-muted-foreground mt-2">
                          Support:<br />
                          <a href="mailto:support@cryptowave.com" className="text-primary hover:underline">support@cryptowave.com</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Phone className="text-primary" size={20} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Call Us</h4>
                        <p className="text-muted-foreground">
                          <a href="tel:+14155552671" className="hover:text-primary">+1 (415) 555-2671</a>
                        </p>
                        <p className="text-muted-foreground text-sm mt-1">
                          Monday-Friday: 9:00 AM - 6:00 PM PST
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MessageSquare className="text-primary" size={20} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Live Chat</h4>
                        <p className="text-muted-foreground mb-2">
                          Chat with our support team in real-time.
                        </p>
                        <button className="text-sm px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10">
                          Start Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
