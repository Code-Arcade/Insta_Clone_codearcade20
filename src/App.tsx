import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/Auth/AuthPage';
import Navigation from './components/Layout/Navigation';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import Explore from './components/Pages/Explore';
import Notifications from './components/Pages/Notifications';
import About from './components/Pages/About';
import CreatePost from './components/Post/CreatePost';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handlePageChange = (page: string) => {
    if (page === 'create') {
      setShowCreatePost(true);
    } else {
      setCurrentPage(page);
      setSelectedUser(null);
    }
  };

  const handleUserClick = (username: string) => {
    setSelectedUser(username);
    setCurrentPage('profile');
  };

  const handlePostCreated = () => {
    setCurrentPage('home');
  };

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onUserClick={handleUserClick} />;
      case 'explore':
        return <Explore onUserClick={handleUserClick} />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile selectedUser={selectedUser} onUserClick={handleUserClick} />;
      case 'about':
        return <About />;
      default:
        return <Home onUserClick={handleUserClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      
      <main className="pb-16 md:pt-16 md:pb-4">
        <div className="max-w-2xl mx-auto px-4">
          {renderCurrentPage()}
        </div>
      </main>

      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;