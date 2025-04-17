
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ThumbsUp } from 'lucide-react';

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: number;
  likes: number;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  summary,
  date,
  category,
  imageUrl,
  readTime,
  likes
}) => {
  return (
    <div className="crypto-card h-full flex flex-col">
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-primary px-2 py-1 rounded-full text-xs font-medium text-white">
            {category}
          </span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary">
          <Link to={`/news/${id}`}>{title}</Link>
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {summary}
        </p>
        
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <span>{date}</span>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{readTime} min read</span>
            </div>
            
            <div className="flex items-center">
              <ThumbsUp size={14} className="mr-1" />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
