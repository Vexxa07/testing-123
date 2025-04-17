
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 py-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertTriangle className="text-primary" size={32} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center justify-center crypto-button bg-transparent border border-primary hover:bg-primary/10 text-primary"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center crypto-button"
            >
              <Home size={16} className="mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
