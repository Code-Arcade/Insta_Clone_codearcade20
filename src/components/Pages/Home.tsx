import React, { useState, useEffect } from 'react';
import PostCard from '../Post/PostCard';
import { Post } from '../../types';
import { getPosts } from '../../utils/storage';

interface HomeProps {
  onUserClick: (username: string) => void;
}

const Home: React.FC<HomeProps> = ({ onUserClick }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    setIsLoading(true);
    const allPosts = getPosts();
    // Sort posts by timestamp (newest first)
    const sortedPosts = allPosts.sort((a, b) => b.timestamp - a.timestamp);
    setPosts(sortedPosts);
    setIsLoading(false);
  };

  // Listen for storage changes to refresh posts when new ones are created
  useEffect(() => {
    const handleStorageChange = () => {
      loadPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when posts are updated
    window.addEventListener('postsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('postsUpdated', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-500">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No posts yet</h3>
          <p className="text-gray-600">When you share photos, they'll appear on your feed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onUserClick={onUserClick}
        />
      ))}
    </div>
  );
};

export default Home;