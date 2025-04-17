
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t border-border mt-12 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="bg-primary text-white p-1 rounded font-bold">CW</span>
              <span className="font-bold text-lg">CryptoWave</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for crypto news, research, and market insights.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/news" className="text-muted-foreground hover:text-primary">News</Link></li>
              <li><Link to="/research" className="text-muted-foreground hover:text-primary">Research</Link></li>
              <li><Link to="/charts" className="text-muted-foreground hover:text-primary">Charts</Link></li>
              <li><Link to="/sentiment" className="text-muted-foreground hover:text-primary">Sentiment</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Learning Hub</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Glossary</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Subscribe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest crypto news and updates delivered to your inbox.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm rounded-l-md bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="crypto-button rounded-l-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 CryptoWave Insight Hub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
